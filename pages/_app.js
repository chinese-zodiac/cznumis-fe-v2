import React from 'react';
import Head from 'next/head';
import BaseThemeProvider from '../providers/BaseThemeProvider';
import { DAppProvider, BSC } from '@usedapp/core';

const config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://bscrpc.com'
  },
  networks: [BSC]
}

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Head>
        <title>Numis.CZ.Cash | Collect rare US coinage with 1:1 backed NFTs.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BaseThemeProvider>
        <Component {...pageProps} />
      </BaseThemeProvider>
    </DAppProvider>
  )
}

export default MyApp
