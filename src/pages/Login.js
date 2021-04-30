import React from 'react';
import logo from '../assets/images/logo.svg';
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import './Login.css';
import ButtonCreateAccount from '../components/Button/ButtonCreateAccount';
import ButtonLogin from '../components/Button/ButtonLogin';
import ButtonNoAccount from '../components/Button/ButtonNoAccount';

class Login extends React.Component{
    render = () =>{
        return (
            <React.Fragment>
                <div className="login-logo">
                    <img src={logo} className="logo" alt="Logo"/>
                </div>
                <div className="login-lowympact">
                    Lowympact
                </div>
                <a href="/signup" className="button-account">
                    <ButtonCreateAccount />
                </a>
                <a href="/signin" className="button-connect">
                    <ButtonLogin />
                </a>
                <a href="/history" className="button-no-account">
                    <ButtonNoAccount />
                </a>
                <div className="logo-fruits">
                    <img src={fruits} className="logo" alt="Fruits"/>
                </div>
            </React.Fragment>
            
        );
    }
}
export default Login;
