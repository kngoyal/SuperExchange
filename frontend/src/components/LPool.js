import React, {Component} from 'react';
import Table from './Table';

export default class LPool extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ...this.props,
        rows: [
            {'id': 1, 'Flow Rate': 'IN', 'DAI': 0, 'USDC': 0},
            {'id': 2, 'Flow Rate': 'OUT', 'DAI': 0, 'USDC': 0},
        ],
        header: ['id', 'Flow Rate', 'DAI', 'USDC'],
        headerLength: 4,
        feeDAI: 0,
        feeUSDC: 0,
    };
  }

  renderTableHeader = () => {
    let header = Object.keys(this.state.tokens);
    return header.map((key, index) => {
        return <th key={index}>{key}</th>
    });
  }

  render() {
    return (
    <div className='rightComponent lPool'>
      <h1 className='sectionTitle'> Liquidity Pool </h1>
      <Table name='lPool' rows={this.state.rows} header={this.state.header} headerLength={this.state.headerLength}/>
      <h2 className='sectionTitle'> Net Fee Collected : {this.state.feeDAI} DAI + {this.state.feeUSDC} USDC</h2>
    </div>
    );
  }
}
