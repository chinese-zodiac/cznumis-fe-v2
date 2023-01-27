import { openSans } from '@/providers/BaseThemeProvider';
import { Html, Head, Main, NextScript } from 'next/document';

//TODO: Add opengraph image
const OpenGraphImg = '';

export default function Document() {
  return (
    <Html lang="en" className={openSans.className}>
      <Head>
        <meta
          name="description"
          content="Each NFT has a unique serial number representing its documented and graded physical coin held in trust by Rafalovich Coins. When you purchase the NFT, you get copyright and redemption rights as set by Rafalovich Coins. The NFTs may be redeemed for the physical coin; to do so, you will need to burn the NFT and pay a handling fee."
        />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:locale" content="en_EN" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:title"
          content="Numis.CZ.Cash | Collect rare US coinage with 1:1 backed NFTs."
        />
        <meta property="og:site_name" content="Numis.CZ.Cash" />
        <meta property="og:url" content="https://numis.cz.cash" />
        <meta
          property="og:description"
          content="Each NFT has a unique serial number representing its documented and graded physical coin held in trust by Rafalovich Coins. When you purchase the NFT, you get copyright and redemption rights as set by Rafalovich Coins. The NFTs may be redeemed for the physical coin; to do so, you will need to burn the NFT and pay a handling fee."
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={OpenGraphImg} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://numis.cz.cash" />
        <meta
          name="twitter:title"
          content="Numis.CZ.Cash | Collect rare US coinage with 1:1 backed NFTs."
        />
        <meta name="twitter:image" content={OpenGraphImg} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta
          name="twitter:description"
          content="Each NFT has a unique serial number representing its documented and graded physical coin held in trust by Rafalovich Coins. When you purchase the NFT, you get copyright and redemption rights as set by Rafalovich Coins. The NFTs may be redeemed for the physical coin; to do so, you will need to burn the NFT and pay a handling fee."
        />
      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
