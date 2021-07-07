import React, {useState} from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import '../App.css';

export default function TraderForm({atSubmit}) {
    
    const [name, setName] = useState('Your Name');
    const [streamRatePerSecond, setStreamRatePerSecond] = useState('Stream Rate per Second');
    const [tokenSwap, setTokenSwap] = useState('DAI → USDC');

    const handleSubmit = event => {
        event.preventDefault();
        var newUser = {
            userType: 'trader',
            name: name,
            streamRatePerSecond: streamRatePerSecond,
            tokenSwap: tokenSwap,
        };
        console.log('NEW TRADER FORM ON SUBMIT : ', newUser);
        atSubmit(newUser);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='inputText' style={{textAlign:'center'}} type='text' name='name' placeholder={name} onChange={e => setName(e.target.value)} />
            <Tabs 
                defaultActiveKey='DAI → USDC' transition={false} id='uncontrolled-tab-example' 
                onSelect={(k) => setTokenSwap(k)}>
                <Tab eventKey='DAI → USDC' title='DAI → USDC' unmountOnExit={true} />
                <Tab eventKey='USDC → DAI' title='USDC → DAI' unmountOnExit={true} />
            </Tabs>
            <input className='inputText' style={{textAlign:'center'}} type='text' name='streamRatePerSecond' placeholder={streamRatePerSecond} onChange={e => setStreamRatePerSecond(e.target.value)} />
            <input className='submitButton' type='submit' value='Start Streaming' />
        </form>
    );
}
