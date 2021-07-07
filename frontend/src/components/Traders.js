import React, {useState, useEffect} from 'react';
import Table from './Table';

const tokenAddresses = {
  daixAddress: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',
  usdcxAddress: '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a',
  contractAddress: '0x6744F9394B8bAdF42d0eAa28f1914148d1b247c1'
};

export default function Traders({traderCount: parentTraderCount, traders: parentTraders}) {
  
  const header = ['id', 'Name', 'Streaming Rate', 'Tokens Paid', 'Fee Paid ($)', 'Tokens Retrieved'];
  const headerLength = 6;

  const [traders, setTraders] = useState(parentTraders);
  const [traderCount, setTraderCount] = useState(parentTraderCount);
  const [timeElapsed, setTimElapsed] = useState(0);

  useEffect(() => {
    setTraders(parentTraders);
    console.log(parentTraders);
  }, [parentTraders]);

  useEffect(() => {
    setTraderCount(parentTraderCount);
    console.log(parentTraderCount);
  }, [parentTraderCount]);

  const createTraderFlow = async(trader) => {
    console.log('CREATING TRADING FLOW for : ', trader);
    // create trading flow
    var sourceToken = tokenAddresses.daixAddress;
    var destinationToken = tokenAddresses.usdcxAddress;
    if (trader.tokenSwap==='USDC -> DAI') {
      sourceToken = tokenAddresses.usdcxAddress;
      destinationToken = tokenAddresses.daixAddress;
    }

    // start streaming sourceToken from User Wallet to Contract
    console.log(`Create ${trader.streamRatePerSecond} ${sourceToken} Trader Flow from ${trader.walletAddress} to ${tokenAddresses.contractAddress}`);
    // await this.state.sf.cfa.createFlow({
    //   superToken: sourceToken,
    //   sender: trader.walletAddress,
    //   receiver: tokenAddresses.contractAddress,
    //   flowRate: trader.streamRatePerSecond
    // });

    // start streaming destinationToken from Contract to User Wallet
    console.log(`Create ${trader.streamRatePerSecond} ${destinationToken} Trader Flow from ${tokenAddresses.contractAddress} to ${trader.walletAddress}`);
    // await this.state.sf.cfa.createFlow({
    //   superToken: destinationToken,
    //   sender: tokenAddresses.contractAddress,
    //   receiver: trader.walletAddress,
    //   flowRate: trader.streamRatePerSecond
    // });
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
    // await this.state.sf.cfa.deleteFlow({
    //   superToken: sourceToken,
    //   sender: trader.walletAddress,
    //   receiver: tokenAddresses.contractAddress,
    //   by: trader.walletAddresses,
    // });

    // close streaming destinationToken from Contract to User Wallet
    console.log(`Create ${trader.streamRatePerSecond} ${destinationToken} Trader Flow from ${tokenAddresses.contractAddress} to ${trader.walletAddress}`);
    // await this.state.sf.cfa.deleteFlow({
    //   superToken: destinationToken,
    //   sender: tokenAddresses.contractAddress,
    //   receiver: trader.walletAddress,
    //   by: trader.walletAddresses,
    // });
  }

  const updateTraders = async() => {
    for (let i=0; i<this.state.traders.length(); i++) {
      if(this.state.traders[i].timeElapsed>9){
        await closeTraderFlow(this.state.traders[i]);
      } else {
        console.log(`Updating ${this.state.traders[i]}`);
        this.state.traders[i].timeElapsed += 5;
        let value = this.state.traders[i].streamRatePerSecond*this.state.traders[i].timeElapsed;
        this.state.traders[i]['Tokens Paid'] = this.state.traders[i].tokenSwap==='DAI → USDC' ? `${value} DAI` : `${value} USDC`;
        this.state.traders[i]['Tokens Retrieved'] = this.state.traders[i].tokenSwap==='DAI → USDC' ? `${value} USDC` : `${value} DAI`;
      }
    }
  }

  // shouldComponentUpdate(nextState) {
  //   console.log('SHOULD COMPONENT UPDATE : ', this.state, nextState);
  //   if(this.state.traders.length === nextState.traders.length-1) {
  //     const newTrader = nextState.traders[nextState.traders.length-1];
  //     this.createTraderFlow(newTrader);
  //     return true;
  //   } else if(this.state.timeElapsed === nextState.timeElapsed+5) {
  //     this.updateTraders();
  //     return true;
  //   }
  //   return false;
  // }
  
  return (
    <div className='leftComponent traders'>
      <h1 className='sectionTitle'> Traders </h1>
      <Table name='traders' rows={traders} header={header} headerLength={headerLength}/>
    </div>
  );
}
