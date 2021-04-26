import logo from "../assets/images/logo.svg";

function Error404() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="logo" alt="logo" />
				<h1>Erreur 404</h1>
				<a href="/">Retourner à l'accueil</a>
			</header>
		</div>
	);
}

export default Error404;
