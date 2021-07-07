import React, { useState, useCallback, useEffect } from 'react';

import UserForm from '../components/UserForm';
import Traders from '../components/Traders';
import LProviders from '../components/LProviders';
import LPool from '../components/LPool';

import '../App.css';

export default function Portal() {
  
  const [traders, setTraders] = useState([]);
  const [lProviders, setLProviders] = useState([]);
  const [traderCount, setTraderCount] = useState(0);
  const [lProviderCount, setLProviderCount] = useState(0);

  useEffect(() => {
    console.log(traderCount, traders);
    setTraders(traders);
    setTraderCount(traderCount);
  }, [traderCount, traders]);

  // const [sf, setSF] = useState();

  // componentDidMount() {
  //   if (this.state.sf!==undefined) {
  //     this.getStoredSFSDK();
  //   }
  //   else {
  //     try {
  //       this.initializeSuperFluid().then(sf => {
  //         console.log('SUPERFLUID INITIALIZED sf : ', sf);
  //         var Flatted = require('flatted');
  //         setSF(Flatted.stringify(sf));
  //         // console.log('SUPERFLUID INITIALIZED this.state.sf ', this.state.sf);
  //       });
  //     } catch (error) {
  //       alert('Unable to initialize SUPERFLUID');
  //       console.error(error);
  //     }
  //   }
  // }

  // async initializeSuperFluid() {
  //   console.log('INITIALIZING SUPERFLUID in Portal.js');
  //   const SuperfluidSDK = require('@superfluid-finance/js-sdk');
  //   const Web3 = require('web3');
    
  //   const sf = new SuperfluidSDK.Framework({
  //       web3: new Web3(window.ethereum),
  //   });
    
  //   await sf.initialize();
  //   return sf;
  // }

  // async getStoredSFSDK() {
  //   var Flatted = require('flatted');
  //   const sf = Flatted.parse(this.state.sf);
  //   console.log('SUPERFLUID STORED UNFLATTENED sf : ', sf);
  // }

  const handleNewUser = useCallback(
    (newUser) => {
      var userType = newUser.userType;
      console.log('New User : ', userType, newUser);
      if(userType==='trader') {
        setTraders(traders => [...traders, newUser]);
        setTraderCount(traderCount => traderCount+1);
        console.log('NEW TRADERS : ', traderCount, traders);
      } else if(userType==='lProvider') {
        setLProviders(lProviders => [...lProviders, newUser]);
        setLProviderCount(lProviderCount => lProviderCount+1);
        console.log('NEW LPROVIDERS : ', lProviderCount, lProviders);
      }
      // this.getStoredSFSDK();
    },
    [],
  ); 

  // handleUserUpdate(userType, subUsers) {
  //   if(userType==='trader') {
  //     this.setState((prevState) => ({
  //       users: {
  //         ...prevState.users,
  //         traders: subUsers,
  //       }
  //     }));
  //   } else if(userType==='lProvider') {
  //     this.setState((prevState) => ({
  //       users: {
  //         ...prevState.users,
  //         lProviders: subUsers,
  //       }
  //     }));
  //   }
  // }

  return (
    <div>
      <div className='rowComp'>
        <UserForm traderCount={traderCount} lProviderCount={lProviderCount} onChange={handleNewUser} />
        <LPool />
      </div>
      <br/>
      <div className='rowComp'>
        <Traders traderCount={traderCount} traders={traders} />
        <LProviders lProviders={lProviders} />
      </div>
    </div>
  );

}
