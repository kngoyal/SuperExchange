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
  const [sf, setSF] = useState('');

  useEffect(() => {
    initializeSuperFluid().then(res => {
      setSF(res);
    });
  }, []);

  useEffect(() => {
    console.log(sf);
  }, [sf]);

  const initializeSuperFluid = async() => {
    console.log('INITIALIZING SUPERFLUID in Portal.js');
    const SuperfluidSDK = require('@superfluid-finance/js-sdk');
    const Web3 = require('web3');
    
    const sf = new SuperfluidSDK.Framework({
        web3: new Web3(window.ethereum),
    });
    
    await sf.initialize();
    return sf;
  }

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
    },
    [],
  );

  return (
    <div>
      <div className='rowComp'>
        <UserForm traderCount={traderCount} lProviderCount={lProviderCount} onChange={handleNewUser} />
        <LPool />
      </div>
      <br/>
      <div className='rowComp'>
        <Traders traderCount={traderCount} traders={traders} />
        <LProviders lProviderCount={lProviderCount} lProviders={lProviders} />
      </div>
    </div>
  );

}
