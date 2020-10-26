import React from 'react';

function login(url, metodo, conteudo, token) {
    return fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            Authorization: token && `Bearer ${token}`,
        },
        body: JSON.stringify(conteudo),
    });
}

export function Login (props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const { token, setToken } = props;
	const [error, setError] = React.useState(false);


	return (
		<div className="login">
			{token ? (
				<button onClick={ (event) => { setToken(null); setError(false);} }>Deslogar</button>
			) : (
				<form 
					className="formLogin" onSubmit={ (event) => {
					event.preventDefault();
				
					login("https://desafio-3-back-cubos-academy.herokuapp.com/auth",
					"POST", { email, password },
					)
						.then( res => res.json())
						.then( responseJson => {
							const newToken = responseJson.dados.token;
							setToken(newToken);
							setEmail("");
							setPassword("");
						}).then( () => token ? setError(false) : setError(true))
				}}>
					<label htmlFor="email">
						Email{" "}				
						<input id="email" type="email" value={email}
						className={error ? "error" : ""}
						onInput={ event => setEmail(event.target.value) }/
						>
					</label>
				
					<label htmlFor="password">
						Senha{" "}
						<input id="password" type="password" value={password}
						className={error ? "error" : ""}
						onInput={ event => setPassword(event.target.value) }/>
					</label>
				
					<button>Logar</button>
				</form>				
			)}
		</div>
	)
};