import './Header.css';
import logo from '../../assets/images/logo.svg';

function Header() {
  return (
    <div className="header-container">
        <img src={logo} className="header-logo"/>
        <span>Lowympact</span>
    </div>
  );
}

export default Header;