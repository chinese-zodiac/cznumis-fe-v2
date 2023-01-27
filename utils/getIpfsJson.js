import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/node';
import fetchRetry from './fetchRetry';
import { memoize, random } from 'lodash';
import { GATEWAYS_CZODIAC } from '../constants/gateways';

const gatewayTools = new IPFSGatewayTools();

export const getIpfsUrl = (sourceUrl) => {
    return gatewayTools.convertToDesiredGateway(sourceUrl, GATEWAYS_CZODIAC);
}

export const getIpfsJson = memoize(async (sourceUrl) => {
    let s = window.localStorage;
    let item = JSON.parse(s.getItem(sourceUrl));
    if (item != null) return item;

    let result = await fetchRetry(
        getIpfsUrl(sourceUrl)
    );
    item = await result.json();
    s.setItem(sourceUrl, JSON.stringify(item));
    return item;
})