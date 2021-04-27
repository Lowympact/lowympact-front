import React from 'react';
import logo from '../assets/images/logo.svg';
import './Login.css';
import ButtonCreateAccount from '../components/Button/ButtonCreateAccount.js';

class Login extends React.Component{
    render = () =>{
        return (
            <React.Fragment>
                <div className="App">
                    <img src={logo} className="logo"/>
                </div>
                <div className="login">
                    Konsume
                </div>
                <div className="button-account">
                    <ButtonCreateAccount />
                </div>
            </React.Fragment>
            
        );
    }
}

export default Login;