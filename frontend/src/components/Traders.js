import React, {Component} from 'react';
import Table from './Table';

const tokenAddresses = {
  daixAddress: '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00',
  usdcxAddress: '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a',
  contractAddress: '0x6744F9394B8bAdF42d0eAa28f1914148d1b247c1'
};

export default class Traders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      header: ['id', 'Name', 'Streaming Rate', 'Tokens Paid', 'Fee Paid ($)', 'Tokens Retrieved'],
      headerLength: 6,
      timeElapsed: 0,
    };
    console.log('TRADERS CONSTRUCTOR STATE : ', this.state);
  }

  async createTraderFlow(trader) {
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

  async closeTraderFlow(trader) {
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

  async updateTraders() {
    for (let i=0; i<this.state.traderCount; i++) {
      if(this.state.traders[i].timeElapsed>9){
        await this.closeTraderFlow(this.state.traders[i]);
      } else {
        console.log(`Updating ${this.state.traders[i]}`);
        this.state.traders[i].timeElapsed += 5;
        let value = this.state.traders[i].streamRatePerSecond*this.state.traders[i].timeElapsed;
        this.state.traders[i]['Tokens Paid'] = this.state.traders[i].tokenSwap==='DAI → USDC' ? `${value} DAI` : `${value} USDC`;
        this.state.traders[i]['Tokens Retrieved'] = this.state.traders[i].tokenSwap==='DAI → USDC' ? `${value} USDC` : `${value} DAI`;
      }
    }
  }

  shouldComponentUpdate(nextState) {
    console.log('SHOULD COMPONENT UPDATE : ', this.state, nextState);
    if(this.state.traderCount === nextState.traderCount-1) {
      const newTrader = nextState.traders[nextState.traderCount-1];
      this.createTraderFlow(newTrader);
      return true;
    } else if(this.state.timeElapsed === nextState.timeElapsed+5) {
      this.updateTraders();
      return true;
    }
    return false;
  }

  componentDidUpdate(prevState) {
    console.log('COMPONENT DID UPDATE STATE : ', this.state, prevState);
    if(this.state.traderCount === prevState.traderCount+1) {
      console.log('COMPONENT DID UPDATE STATE : ', this.state);
    }
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT STATE : ', this.state);
    // this.interval = setInterval(() => this.setState({timeElapsed: this.state.timeElapsed+5}), 5000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  render() {
    return (
    <div className='leftComponent traders'>
      <h1 className='sectionTitle'> Traders </h1>
      <Table name='traders' rows={this.state.traders} header={this.state.header} headerLength={this.state.headerLength}/>
    </div>
    );
  }
}
