import { truncateAddress } from '@/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const routes = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Account',
    href: '/account',
  },
  {
    name: 'Register',
    href: '/register',
  },
];

const NavBar = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const [walletAddress, setWalletAddress] = useState<`0x${string}` | null>(
    null
  );

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [address]);

  const handleConnectWallet = async () => {
    try {
      await connectAsync({ connector: connectors[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 relative z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-end">
          {routes.map((route) => {
            return (
              <Link
                key={route.name}
                href={route.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {route.name}
              </Link>
            );
          })}
          <button
            onClick={isConnected ? handleDisconnectWallet : handleConnectWallet}
            className="bg-gray-900 text-white px-3 py-2 ml-4 rounded-md text-sm font-medium"
          >
            {walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
