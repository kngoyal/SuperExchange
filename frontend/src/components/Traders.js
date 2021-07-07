import React, {useState, useEffect, useRef} from 'react';
import Table from './Table';

const tokenAddresses = {
  daixAddress: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',
  usdcxAddress: '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a',
  contractAddress: '0x6744F9394B8bAdF42d0eAa28f1914148d1b247c1'
};

export default function Traders({sf, traderCount: parentTraderCount, traders: parentTraders}) {

  const header = ['id', 'Name', 'Streaming Rate', 'Tokens Paid', 'Fee Paid ($)', 'Tokens Retrieved', 'timeElapsed'];
  const headerLength = 7;

  const [newTrader, setNewTrader] = useState({});
  const [traders, setTraders] = useState(parentTraders);
  const [traderCount, setTraderCount] = useState(parentTraderCount);
  const [timeElapsed, setTimElapsed] = useState(0);

  const hasMounted = useRef();

  useEffect(() => {
    setTraders(parentTraders);
    console.log(parentTraders);
  }, [parentTraders]);

  useEffect(() => {
    console.log(parentTraderCount, traderCount);
    if(traderCount===parentTraderCount-1) {
      console.log(parentTraders);
      setNewTrader(parentTraders[parentTraderCount-1]);
      setTraderCount(parentTraderCount);
    }
  }, [parentTraderCount]);

  useEffect(() => {
    if(hasMounted.current) {
      console.log('New Trader : ', newTrader);
      createTraderFlow();
    }
    hasMounted.current = true;
  }, [newTrader]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimElapsed(timeElapsed => timeElapsed + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateTraders();
  }, [timeElapsed]);


  const createTraderFlow = async() => {
    console.log('CREATING TRADING FLOW for : ', newTrader);

    // create trading flow
    var sourceToken = tokenAddresses.daixAddress;
    var destinationToken = tokenAddresses.usdcxAddress;
    if (newTrader.tokenSwap==='USDC -> DAI') {
      sourceToken = tokenAddresses.usdcxAddress;
      destinationToken = tokenAddresses.daixAddress;
    }

    // start streaming sourceToken from User Wallet to Contract
    console.log(`Create ${newTrader.streamRatePerSecond} ${sourceToken} Trader Flow from ${newTrader.walletAddress} to ${tokenAddresses.contractAddress}`);
    // await sf.cfa.createFlow({
    //   superToken: sourceToken,
    //   sender: trader.walletAddress,
    //   receiver: tokenAddresses.contractAddress,
    //   flowRate: trader.streamRatePerSecond
    // });

    // start streaming destinationToken from Contract to User Wallet
    console.log(`Create ${newTrader.streamRatePerSecond} ${destinationToken} Trader Flow from ${tokenAddresses.contractAddress} to ${newTrader.walletAddress}`);
    // await sf.cfa.createFlow({
    //   superToken: destinationToken,
    //   sender: tokenAddresses.contractAddress,
    //   receiver: trader.walletAddress,
    //   flowRate: trader.streamRatePerSecond
    // });

    traders[traderCount-1].tap='open';
    console.log(traders);

  }

  const closeTraderFlow = async(trader) => {
    console.log(`CLOSING TRADING FLOW for ${trader}`);
    // create trading flow
    var sourceToken = tokenAddresses.daixAddress;
    var destinationToken = tokenAddresses.usdcxAddress;
    if (trader.tokenSwap==='USDC -> DAI') {
      sourceToken = tokenAddresses.usdcxAddress;
      destinationToken = tokenAddresses.daixAddress;
    }

    // close streaming sourceToken from User Wallet to Contract
    console.log(`Close ${trader.streamRatePerSecond} ${sourceToken} Trader Flow from ${trader.walletAddress} to ${tokenAddresses.contractAddress}`);
    // await sf.cfa.deleteFlow({
    //   superToken: sourceToken,
    //   sender: trader.walletAddress,
    //   receiver: tokenAddresses.contractAddress,
    //   by: trader.walletAddresses,
    // });

    // close streaming destinationToken from Contract to User Wallet
    console.log(`Close ${trader.streamRatePerSecond} ${destinationToken} Trader Flow from ${tokenAddresses.contractAddress} to ${trader.walletAddress}`);
    // await sf.cfa.deleteFlow({
    //   superToken: destinationToken,
    //   sender: tokenAddresses.contractAddress,
    //   receiver: trader.walletAddress,
    //   by: trader.walletAddresses,
    // });
  }

  const updateTraders = async() => {
    for (let i=0; i<traderCount; i++) {
      if (traders[i].tap==='close') {
        continue;
      }
      if(traders[i].timeElapsed===10){
        traders[i].tap = 'close';
        await closeTraderFlow(traders[i]);
      } else {
        console.log(`Updating ${traders[i]}`);
        traders[i].timeElapsed += 5;
        let value = traders[i].streamRatePerSecond*traders[i].timeElapsed;
        traders[i]['Tokens Paid'] = traders[i].tokenSwap==='DAI → USDC' ? `${value} DAI` : `${value} USDC`;
        traders[i]['Tokens Retrieved'] = traders[i].tokenSwap==='DAI → USDC' ? `${value} USDC` : `${value} DAI`;
      }
    }
  }
  
  return (
    <div className='leftComponent traders'>
      <h1 className='sectionTitle'> Traders </h1>
      <Table name='traders' rows={traders} header={header} headerLength={headerLength}/>
    </div>
  );
}
