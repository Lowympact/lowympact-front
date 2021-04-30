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
                <div className="button-account">
                    <ButtonCreateAccount />
                </div>
                <div className="button-connect">
                    <ButtonLogin />
                </div>
                <div className="button-no-account">
                    <ButtonNoAccount />
                </div>
                <div className="logo-fruits">
                    <img src={fruits} className="logo" alt="Fruits"/>
                </div>
            </React.Fragment>
            
        );
    }
}
export default Login;
