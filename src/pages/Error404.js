import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

function Error404() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="logo" alt="logo" />
				<h1>Erreur 404</h1>
				<Link to="/">Retourner à l'accueil</Link>
			</header>
		</div>
	);
}

export default Error404;
