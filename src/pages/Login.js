import React from 'react';
import logo from '../assets/images/logo.svg';
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import './Login.css';
import ButtonCreateAccount from '../components/Button/ButtonCreateAccount';
import ButtonLogin from '../components/Button/ButtonLogin';

class Login extends React.Component{
    render = () =>{
        return (
            <React.Fragment>
                <div className="login-logo">
                    <img src={logo} className="logo"/>
                </div>
                <div className="login-konsume">
                    Konsume
                </div>
                <div className="button-account">
                    <ButtonCreateAccount />
                </div>
                <div className="button-connect">
                    <ButtonLogin />
                </div>
                <div className="logo-fruits">
                    <img src={fruits} className="logo"/>
                </div>
            </React.Fragment>
            
        );
    }
}
export default Login;
