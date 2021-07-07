import React, {useState} from 'react';

import '../App.css';

export default function LProviderForm({atSubmit}) {

    const [name, setName] = useState('Your Name');
    const [DAIStreamRatePerSecond, setDAIStreamRatePerSecond] = useState('DAI Stream Rate per Second');
    const [USDCStreamRatePerSecond, setUSDCStreamRatePerSecond] = useState('USDC Stream Rate per Second');

    const handleSubmit = event => {
        event.preventDefault();
        var newUser = {
            userType: 'lProvider',
            name: name,
            DAIStreamRatePerSecond: DAIStreamRatePerSecond,
            USDCStreamRatePerSecond: USDCStreamRatePerSecond,
        };
        console.log('NEW LPROVIDER FORM ON SUBMIT : ', newUser);
        atSubmit(newUser);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='inputText' style={{textAlign:'center'}} type='text' name='name' placeholder={name} onChange={e => setName(e.target.value)} />
            <input className='inputText' style={{textAlign:'center'}} type='text' name='DAIStreamRatePerSecond' placeholder={DAIStreamRatePerSecond} onChange={e => setDAIStreamRatePerSecond(e.target.value)} />
            <input className='inputText' style={{textAlign:'center'}} type='text' name='USDCStreamRatePerSecond' placeholder={USDCStreamRatePerSecond} onChange={e => setUSDCStreamRatePerSecond(e.target.value)} />
            <input className='submitButton' type='submit' value='Start Streaming' />
        </form>
    );

}
