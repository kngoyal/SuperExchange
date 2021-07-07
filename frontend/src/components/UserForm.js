import React, {useState, useEffect} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Web3 from 'web3';

import TraderForm from './TraderForm';
import LProviderForm from './LProviderForm';

import '../App.css';

export default function UserForm({traderCount, lProviderCount, onChange}) {
    
    const [newUser, setNewUser] = useState({});
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        setNewUser(prevUser => ({...prevUser, walletAddress: walletAddress}));
    }, [walletAddress]);

    useEffect(() => {
        onChange(newUser);
    }, [newUser]);

    const connectWallet = async () => {
        console.log('3');
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                    params: [
                      {
                        eth_accounts: {}
                      }
                    ]
                }).then((accounts) => {
                    console.log('Connected Wallets : ', accounts);
                    setWalletAddress(accounts[0]);
                    console.log('User has allowed account access to dApp...', walletAddress);
                });
                window.web3 = new Web3(window.ethereum);
                return true;
            } catch(e) {
                console.error('User has denied account access to dApp...');
            }
        } else {
            alert('Please install MetaMask to use this dApp!');
        }
        return false;
    }

    const createTrader = (trader) => {
        console.log('Creating new TRADER : ');
        var newTrader = {
          'id': traderCount+1, 
          'Name': trader.name, 
          'Streaming Rate': trader.streamRatePerSecond, 
          'Tokens Paid': trader.tokenSwap==='DAI → USDC' ? '0 DAI' : '0 USDC', 
          'Fee Paid ($)': 0, 
          'Tokens Retrieved': trader.tokenSwap==='DAI → USDC' ? '0 USDC' : '0 DAI',
          'tokenSwap': trader.tokenSwap,
          'streamRatePerSecond': trader.streamRatePerSecond,
          'timeElapsed': 0,
          'walletAddress': walletAddress,
          'userType': 'trader',
          'tap': 'close',
        };
        setNewUser(newTrader);
        console.log(newTrader);
    }

    const createLProvider = (lProvider) => {
        console.log('Creating new LPROVIDER : ');
        var newLProvider = {
          'id': lProviderCount+1,
          'Name': lProvider.name,
          'DAI Stream Rate': lProvider.DAIStreamRatePerSecond,
          'USDC Stream Rate': lProvider.USDCStreamRatePerSecond,
          'DAI Earned': 0,
          'USDC Earned': 0,
          'Net Earning ($)': 0,
          'walletAddress': walletAddress,
          'userType': 'lProvider',
          'tap': 'close',
        };
        setNewUser(newLProvider);
        console.log(newLProvider);
    }

    const addUser = (newUser) => {
        console.log('5', newUser);
        if (newUser.userType==='trader') {
            createTrader(newUser);
        }
        else if (newUser.userType==='lProvider') {
            createLProvider(newUser);
        }
    }

    const handleCallback = (newUser) => {
        console.log('1');
        console.log('New User before connecting wallet : ', newUser);
        connectWallet().then((res) => {
            console.log('2');
            if(res) {
                console.log('4');
                console.log('OK wallet connected, now add user : ', newUser);
                addUser(newUser);
            }
        });
    }

    return (
        <div className='leftComponent userInput'>
            <h1 className='sectionTitle'> Stream Liquidity </h1>
            <Tabs defaultActiveKey='trader' transition={false} id='uncontrolled-tab-example' onSelect={(key) => console.log(`HANDLING TAB EVENT : ${key} selected`)}>
                <Tab eventKey='trader' title='Trader' unmountOnExit={true}>
                    <TraderForm atSubmit={handleCallback}/>
                </Tab>
                <Tab eventKey='lProvider' title='Liquidity Provider' unmountOnExit={true}>
                    <LProviderForm atSubmit={handleCallback}/>
                </Tab>
            </Tabs>
        </div>
    );
}
