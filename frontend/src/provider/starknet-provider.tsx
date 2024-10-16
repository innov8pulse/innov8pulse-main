import React, { ReactNode } from 'react';
import { InjectedConnector } from 'starknetkit/injected';
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from 'starknetkit/argentMobile';
import { WebWalletConnector } from 'starknetkit/webwallet';
import { mainnet, sepolia } from '@starknet-react/chains';
import { StarknetConfig, publicProvider } from '@starknet-react/core';

interface StarknetProviderProps {
  children: ReactNode; // Explicitly typing children
}

export default function StarknetProvider({ children }: StarknetProviderProps) {
  const chains = [mainnet, sepolia];

  const connectors = isInArgentMobileAppBrowser() ? [
    ArgentMobileConnector.init({
      options: {
        dappName: 'Example dapp',
        projectId: 'example-project-id',
        url: ''
      },
      inAppBrowserOptions: {},
    })
  ] : [
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent X' } }),
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    ArgentMobileConnector.init({
      options: {
        dappName: 'Example dapp',
        projectId: 'example-project-id',
        url: ''
      },
    }),
  ];

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
