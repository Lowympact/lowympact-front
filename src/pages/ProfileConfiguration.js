import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonChangePassword from "../components/Button/ButtonChangePassword";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import './ProfileConfiguration.css';
import { USERS } from "../assets/users/users";


function validate(password, currentPassword, newPassword, confirmPassword) {
  const errors = [];

  if(password !== currentPassword) {
      errors.push(<p>Le mot de passe actueil n'est pas correct</p>);
  }
  if (newPassword.length < 6) {
    errors.push(<p>Entre un mot de passe. 6 caràcteres minimum requis</p>);
  }
  if (newPassword !== confirmPassword) {
    errors.push(<p>Les mots de passe ne correspondent pas</p>);
  }
  return errors;
}

class ProfileConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user:USERS,
      currentPassword: "",
      newPassword: "",
      confirmPassword:"",
      errors: [],
      redirect:false
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = this.state;
    const errors = validate(this.state.user.password, currentPassword, newPassword, confirmPassword);
    console.log(this.state.user.mail, this.state.user.password, currentPassword, newPassword, confirmPassword, errors);
    this.setState({ errors });
    if(errors.length===0){
        this.setState({redirect:true});
    }
  };


  render(){
      if(this.state.redirect){
        return <Redirect to='/profil' />;
      }
    console.log(this.state.redirect);
    return(
      <React.Fragment>
        // Background style
        <a href="/login">
          <Header />
        </a>
          <Navbar />
        <div className="logo-fruits">
          <img src={fruits} className="logo" alt="Fruits" />
        </div>
        <div className="screen-title">Configurations:</div>
        <label>
           <div className="email">
               email
           </div>
            <div className="user-email">
                {this.state.user.email}
            </div>
        </label>
        <form className="forms">
          <label>
            mot de passe actueil
            <input
              value={this.state.currentPassword}
              onChange={evt => this.setState({ currentPassword: evt.target.value })}
              type='password'
            />
          </label>
          <label>
          nouveau mot de passe
          <input
            value={this.state.newPassword}
            onChange={evt => this.setState({ newPassword: evt.target.value })}
            type='password'
          />
          </label>
          <label>
          confirmer mot de passe
          <input
            value={this.state.passwordConfirm}
            onChange={evt => this.setState({ confirmPassword: evt.target.value })}
            type='password'
          />
          </label>
        </form>
        <label className="errors-change-password">
          {this.state.errors}
        </label>
      <a className="button-change-password" onClick={this.handleChange}>
        <ButtonChangePassword />
      </a>
		</React.Fragment>
    );
  }
}
export default ProfileConfiguration;