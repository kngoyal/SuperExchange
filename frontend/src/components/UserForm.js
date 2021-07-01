import React, {Component} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Web3 from 'web3';

import TraderForm from './TraderForm';
import LProviderForm from './LProviderForm';

import '../App.css';

const userTypes = [
    {
        label: 'Trader',
        value: 'trader',
    },
    {
        label: 'Liquidity Provider',
        value: 'lProvider',
    }
];

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            tab: 'trader',
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
        console.log('NEW USERFORM STATE ON CHANGE: ', this.state);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log('HANDLING EVENT : ', event);
        console.log('NEW USERFORM STATE ON SUBMIT: ', this.state);
        this.addUser();
        this.connectWallet();
    };

    connectWallet = async () => {
        let web3
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try { 
               window.ethereum.request({ method: 'eth_requestAccounts' }).then(function() {
                   console.log('User has allowed account access to DApp...');
               });
            } catch(e) {
               console.error('User has denied account access to DApp...')
            }
         } else if(window.web3) {
             web3 = new Web3(window.web3.currentProvider);
         }
    }

    addUser = () => {
        if (this.state.newUser.userType==='trader') {
            var newTraders = this.state.users.traders;
            newTraders.push(this.state.newUser)
            this.setState({...this.state, users: {...this.state.users, traders: newTraders}})
            this.props.onChange(this.props.users);
            console.log('TRADERS : ', this.props.users.traders);
        } else if (this.state.newUser.userType==='lProvider') {
            var newLProviders = this.state.users.lProviders;
            newLProviders.push(this.state.newUser)
            this.setState({...this.state, users: {...this.state.users, lProviders: newLProviders}})
            this.props.onChange(this.props.users);
            console.log('LIQUIDITY PROVIDERS : ', this.props.users.lProviders);
        }
    }

    render() {
        return (
        <div className='leftComponent userInput'>
            <h1> Stream Liquidity </h1>
            <div className='userFormBar'>
                <Tabs defaultActiveKey='trader' transition={false} id='uncontrolled-tab-example' onSelect={(index, label) => console.log(index + ' selected')}>
                    <Tab eventKey='trader' title='Trader' unmountOnExit={true} className='userFormBar'>
                        <TraderForm />
                    </Tab>
                    <Tab eventKey='lProvider' title='Liquidity Provider'  unmountOnExit={true}>
                        <LProviderForm />
                    </Tab>
                </Tabs>
            </div>
        </div>
        );
    }
}
