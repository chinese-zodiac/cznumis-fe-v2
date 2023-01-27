import { memoize } from 'lodash';
import { Contract, Provider } from "ethcall";
import { utils, BigNumber } from "ethers";
import { getIpfsJson } from "./getIpfsJson";
import USTSDAbi from "../abi/USTSD.json";
import USTSDPriceOracleAbi from "../abi/USTSDPriceOracle.json";
import { ADDRESS_USTSD, ADDRESS_USTSD_PRICE_ORACLE } from '../constants/addresses';
const { Interface } = utils;

//TODO: Needs a rewrite for pagination

const BATCH = 25;

const epoch = () => {
    return new Date() / 1000;;
}

//Clear the cache - normally, the ustsd metadata does not change
//There are exceptions, for instance if a coin is re-graded, re-photographed, or assigned a new serial number
//So this method allows clearing the cached metadata for an NFT
const resetUstsdMetadataSingleFunc = (id, multicallProvider, cb) => {
    return (async () => {
        //Clears the batch that the NFT is located within - each batch has an ID equal to the starting index of the first id in the batch
        getUstsdMetadataSet.cache.delete(id - (id % BATCH));
        const USTSD = new Contract(
            ADDRESS_USTSD,
            USTSDAbi
        );
        const USTSDPriceOracle = new Contract(
            ADDRESS_USTSD_PRICE_ORACLE,
            USTSDPriceOracleAbi
        );
        //Sometimes, the multicall or ipfs calls are ratelimited. Using a try block prevents this from breaking the site.
        try {
            const multicallResults = await multicallProvider.all([
                USTSD.ownerOf(id),
                USTSD.tokenURI(id),
                USTSD.serial(id),
                USTSDPriceOracle.getCoinNftPriceCents(ADDRESS_USTSD, id)
            ]);
            let result = {
                id: id,
                owner: multicallResults[0],
                tokenURI: multicallResults[1],
                serial: multicallResults[2],
                price: multicallResults[3] / 100
            }
            if (!result.tokenURI) throw new Error("no tokenURI metadata");
            getIpfsJson.cache.delete(result.tokenURI)
            window.localStorage.removeItem(result.tokenURI);
            let ipfsMetadata = await getIpfsJson(result.tokenURI);
            if (!ipfsMetadata.image) throw new Error("no tokenURI image");
            result = { ...result, ...ipfsMetadata, refresh: resetUstsdMetadataSingleFunc(id, multicallProvider, cb) }
            cb(id, result);
        } catch (err) {
            console.log("USTSD Refresh", id, "err:", err)
            return { isErr: true, err: "Failed to refresh token ID " + id }
        }
    });
}

//Gets the batch that an nft id is contained within, and caches the result with memoize.
//Memoize uses the first parameter as the id for the cache, so the cach can be cleared with the startId.
//Parameteres are self explanatory, except cb. `cb` is called after each individual NFT is loaded so react knows to update the UI.
const getUstsdMetadataSet = memoize(async (startId, batchSize, multicallProvider, USTSD, USTSDPriceOracle, cb) => {
    let initEpoch = epoch();
    //Generates the calls to BSC blockchain for each NFT ID.
    let calls = Array(batchSize).fill(null).map((_, i) => {
        let id = startId + i;
        return [
            USTSD.ownerOf(id),
            USTSD.tokenURI(id),
            USTSD.serial(id),
            USTSDPriceOracle.getCoinNftPriceCents(ADDRESS_USTSD, id)
        ]
    }).flat(1);
    //Try block in case of rate limiting of ipfs or bsc calls
    try {
        const multicallResults = await multicallProvider.all(calls);
        let results = Array(batchSize).fill(null).map((_, i) => {
            let o = i * 4;
            if (!multicallResults[o + 1]) throw new Error("no tokenURI metadata")
            //Returns results of the blockchain bsc calls.
            return {
                id: startId + i,
                owner: multicallResults[o + 0],
                tokenURI: multicallResults[o + 1],
                serial: multicallResults[o + 2],
                price: multicallResults[o + 3] / 100
            }
        });
        for (let i = 0; i < results.length; i++) {
            //Returns ipfs data of the USTSD NFT. It is using the tokenURI retrieved from BSC blockchain.
            let ipfsMetadata = await getIpfsJson(results[i].tokenURI);
            if (!ipfsMetadata.image) throw new Error("no tokenURI image");
            //Adds the ipfs data to the results array.
            results[i] = { ...results[i], ...ipfsMetadata, refresh: resetUstsdMetadataSingleFunc(results[i].id, multicallProvider, cb) }
            //Callback for updating the UX.
            cb(i + startId, results[i]);
        }
        return results;
    } catch (err) {
        console.log("USTSD", startId, "err:", err)
        return { isErr: true, err: "Failed to load token ID " + startId }
    }
});

//Fetches all NFT data.
//NOTE: Only works for nft that starts with id#0 and increments
//callbacak accepts index, result.
/* Example usage:
  const [nftMetadata, setNftMetadata] = useState([])
  const [loadingNftId, setLoadingNftId] = useState(0);
  useEffect(() => {
    if (!library) return;
    let cancel = getUstsdMetadata(library, (i, res) => {
      setNftMetadata((prevNftMetadata) => {
        let newNftMetadata = [...prevNftMetadata]
        newNftMetadata[i] = res;
        console.log({ newNftMetadata })
        return newNftMetadata;
      });
      setLoadingNftId(i);
    });
    return () => cancel();
  }, [chainId])
*/
export const getUstsdMetadata = ((library, cb) => {
    let isCanceled = false;
    let cancel = () => isCanceled = true;
    (async () => {
        const multicallProvider = new Provider();
        await multicallProvider.init(library);
        const USTSD = new Contract(
            ADDRESS_USTSD,
            USTSDAbi
        );
        const USTSDPriceOracle = new Contract(
            ADDRESS_USTSD_PRICE_ORACLE,
            USTSDPriceOracleAbi
        );
        let totalSupply;
        try {
            totalSupply = (await multicallProvider.all([USTSD.totalSupply()]))[0].toNumber();
        } catch (err) {
            console.log("TotalSupply err:", err)
            return;
        }
        if (isCanceled) return;
        for (let i = 0; i < totalSupply; i += BATCH) {
            let batchSize = i + BATCH < totalSupply ? BATCH : totalSupply - i;
            let results = await getUstsdMetadataSet(i, batchSize, multicallProvider, USTSD, USTSDPriceOracle, cb);
            if (results.isErr) {
                getUstsdMetadataSet.cache.delete(i);
                i -= BATCH;
            } else {
                results.forEach((val, j) => {
                    cb(i + j, val);
                })
            }
            if (isCanceled) break;
        }
    })();
    return cancel;
});