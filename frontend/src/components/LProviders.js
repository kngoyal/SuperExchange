import React, {useState, useEffect} from 'react';
import Table from './Table';

export default function LProviders({lProviderCount: parentLProviderCount, lProviders: parentLProviders}) {

  const header = ['id', 'Name', 'DAI Stream Rate', 'USDC Stream Rate', 'DAI Earned', 'USDC Earned', 'Net Earning ($)'];
  const headerLength = 7;

  const [lProviders, setLProviders] = useState(parentLProviders);
  const [lProviderCount, setLProviderCount] = useState(parentLProviderCount);
  const [timeElapsed, setTimElapsed] = useState(0);

  useEffect(() => {
    setLProviders(parentLProviders);
    console.log(parentLProviders);
  }, [parentLProviders]);

  useEffect(() => {
    setLProviderCount(parentLProviderCount);
    console.log(parentLProviderCount);
  }, [parentLProviderCount]);

  return (
    <div className='rightComponent lProviders'>
      <h1 className='sectionTitle'> Liquidity Providers </h1>
      <Table name='lProviders' rows={lProviders} header={header} headerLength={headerLength}/>
    </div>
  );
}
