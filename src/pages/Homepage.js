import { Navbar, NavbarBrand } from 'reactstrap';
import logo from '../assets/images/logo.svg';

function Homepage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        <h1>Lowympact</h1>
      </header>
    </div>
  );
}

export default Homepage;