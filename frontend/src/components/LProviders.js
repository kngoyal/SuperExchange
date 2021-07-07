import React, {Component} from 'react';
import Table from './Table';

export default class LProviders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      header: ['id', 'Name', 'DAI Stream Rate', 'USDC Stream Rate', 'DAI Earned', 'USDC Earned', 'Net Earning ($)'],
      headerLength: 7,
    };
  }

  render() {
    return (
    <div className='rightComponent lProviders'>
      <h1 className='sectionTitle'> Liquidity Providers </h1>
      <Table name='lProviders' rows={this.state.lProviders} header={this.state.header} headerLength={this.state.headerLength}/>
    </div>
    );
  }
}
