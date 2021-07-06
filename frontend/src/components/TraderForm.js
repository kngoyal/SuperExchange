import React, {Component} from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import '../App.css';

export default class TraderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                userType: 'trader',
                name: 'Your Name',
                streamRatePerSecond: 'Stream Rate per Second',
                tokenSwap: 'DAI → USDC',
            }
        };
    }

    handleTabSelect = key => {
        console.log('HANDLING TAB EVENT : ', key);
        this.setState((prevState) => ({
            newUser: {
                ...prevState.newUser, 
                tokenSwap: key
            }
        }));
        console.log('NEW USERFORM STATE ON CHANGE : ', this.state);
    }

    handleInputChange = event => {
        console.log('HANDLING CHANGE EVENT : ', event);
        const {name, value} = event.target;
        this.setState((prevState) => ({
            newUser: {
                ...prevState.newUser, 
                [name]: value
            }
        }));
        console.log('NEW USERFORM STATE ON CHANGE : ', this.state);
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log('NEW USERFORM STATE ON SUBMIT : ', this.state);
        this.props.atSubmit(this.state.newUser);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className='inputText' style={{textAlign:'center'}} type='text' name='name' placeholder={this.state.newUser.name} onChange={this.handleInputChange} />
                <Tabs 
                    defaultActiveKey='DAI → USDC' transition={false} id='uncontrolled-tab-example' 
                    onSelect={(k) => this.handleTabSelect(k)}>
                    <Tab eventKey='DAI → USDC' title='DAI → USDC' unmountOnExit={true} />
                    <Tab eventKey='USDC → DAI' title='USDC → DAI' unmountOnExit={true} />
                </Tabs>
                <input className='inputText' style={{textAlign:'center'}} type='text' name='streamRatePerSecond' placeholder={this.state.newUser.streamRatePerSecond} onChange={this.handleInputChange} />
                <input className='submitButton' type='submit' value='Start Streaming' />
            </form>
        );
    }
}
