import React, {Component} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Web3 from 'web3';

import TraderForm from './TraderForm';
import LProviderForm from './LProviderForm';

import '../App.css';

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
        };
        this.handleCallback = this.handleCallback.bind(this);
    }

    connectWallet = async (newUser) => {
        console.log('3 CALLBACK in UserForm.js', this.state);
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
                    this.setState((prevState) => ({
                        users: {
                            ...prevState.users, 
                            newUser: {
                                ...newUser, 
                                walletAddress: accounts[0]
                            }
                        }
                    }), this.addUser);
                    console.log('New User after connecting wallet : ', this.state.users.newUser);
                    console.log('User has allowed account access to dApp...');
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

    createTrader = (trader, traderId) => {
        console.log('Creating new TRADER');
        var newTrader = {
          'id': traderId, 
          'Name': trader.name, 
          'Streaming Rate': trader.streamRatePerSecond, 
          'Tokens Paid': trader.tokenSwap==='DAI → USDC' ? '0 DAI' : '0 USDC', 
          'Fee Paid ($)': 0, 
          'Tokens Retrieved': trader.tokenSwap==='DAI → USDC' ? '0 USDC' : '0 DAI',
          'tokenSwap': trader.tokenSwap,
          'streamRatePerSecond': trader.streamRatePerSecond,
          'timeElapsed': 0,
          'walletAddress': trader.walletAddress,
        };
        var newTraders = this.state.users.traders;
        newTraders.push(newTrader);
        console.log('Trader row pushed before updating state : ', this.state.users.traders[traderId-1]);
        this.setState((prevState) => ({
            users: {
                ...prevState.users,
                traders: newTraders,
                traderCount: traderId
            }
        }));
        console.log('Trader row pushed after updating state : ', this.state.users.traders[traderId-1]);
    }

    createLProvider = (lProvider, lProviderId) => {
        console.log('Creating new LPROVIDER');
        var newLProvider = {
          'id': lProviderId,
          'Name': lProvider.name,
          'DAI Stream Rate': lProvider.DAIStreamRatePerSecond,
          'USDC Stream Rate': lProvider.USDCStreamRatePerSecond,
          'DAI Earned': 0,
          'USDC Earned': 0,
          'Net Earning ($)': 0,
          'walletAddress': lProvider.walletAddress,
        };
        var newLProviders = this.state.users.lProviders;
        newLProviders.push(newLProvider);
        this.setState((prevState) => ({
            users: {
                ...prevState.users,
                lProviders: newLProviders,
                lProviderCount: lProviderId
            }
        }));
        console.log('LProvider row pushed : ', this.state.users.lProviders[lProviderId-1]);
    }

    addUser = () => {
        console.log('5 CALLBACK in UserForm.js', this.state);
        var newUser = this.state.users.newUser;
        if (newUser.userType==='trader') {
            this.createTrader(newUser, this.state.users.traderCount+1);
            console.log('TRADERS : ', this.state.users.traderCount, this.state.users.traders);
        }
        else if (newUser.userType==='lProvider') {
            this.createLProvider(newUser, this.state.users.lProviderCount+1);
            console.log('LIQUIDITY PROVIDERS : ', this.state.users.lProviderCount, this.state.users.lProviders);
        }
    }

    handleCallback = (newUser) => {
        console.log('1 CALLBACK in UserForm.js', this.state);
        this.setState((prevState) => ({
            users: {
                ...prevState.users,
                newUser: newUser
            }
        }), () => {
            this.connectWallet(newUser).then((res) => {
                console.log('2 CALLBACK in UserForm.js', this.state);
                if(res) {
                    console.log('OK wallet connected, now add user : ', newUser);
                    this.props.onChange(this.state.users);
                }
            })
        });
        console.log('4 CALLBACK in UserForm.js', this.state);
    }

    render() {
        return (
            <div className='leftComponent userInput'>
                <h1 className='sectionTitle'> Stream Liquidity </h1>
                <Tabs defaultActiveKey='trader' transition={false} id='uncontrolled-tab-example' onSelect={(key) => console.log(`HANDLING TAB EVENT : ${key} selected`)}>
                    <Tab eventKey='trader' title='Trader' unmountOnExit={true}>
                        <TraderForm atSubmit={this.handleCallback}/>
                    </Tab>
                    <Tab eventKey='lProvider' title='Liquidity Provider' unmountOnExit={true}>
                        <LProviderForm atSubmit={this.handleCallback}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
