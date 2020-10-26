import React from 'react';
import { Images } from '../images/Images';
// import { Table } from "./Table";


const fetchJson = (url) => fetch(url).then((res) => res.json());

export function Round (props) {

	const [matches, setMatches] = React.useState([]);
	const [round, setRound] = React.useState(1);
	const [editLine, setEditLine] = React.useState(null);
	const [homeGoals, setHomeGoals] = React.useState(undefined);
	const [awayGoals, setAwayGoals] = React.useState(undefined);
	const { token } = props;
	const { table, catchTable } = props;

	const gamesPerRound = () =>{
		fetchJson(`https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${round}`)
		.then(({ dados }) => {
			setMatches( dados );
			})
	}

	function editMatch(id, golsCasa, golsVisitante, token) {
		console.log(id, golsCasa, golsVisitante, token)
		return fetch("https://desafio-3-back-cubos-academy.herokuapp.com/jogos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token && `Bearer ${token}`,
			},
			body: JSON.stringify({ id, golsCasa, golsVisitante }),
		});
	}

	React.useEffect( () => {
		gamesPerRound();
	},[round])

	React.useEffect(() => {
		setHomeGoals(undefined);
		setAwayGoals(undefined);
		setEditLine(null);
	}, [token]);

	function RoundHeader () {
		return(
			<div className="roundHeader">
				<button onClick={ () => round > 1 ? setRound(round - 1) : round}>
					<img src={ Images.arrowLeft } alt="Anterior"/>
				</button>
					
				<h2>{round}ª rodada</h2>
				
				<button onClick={ () => round < 38 ? setRound(round + 1) : round}>
					<img src={ Images.arrowRight } alt="Próxima"/>
				</button>
			</div>
		)
	};

	function RoundBody (props) {

		return(
			<tr>
				<td className="homeTeam">{ props.timeCasa }</td>

				<td className="goals">{
					editLine !== props.j
					? props.golsCasa
					: (<input 
						value={ homeGoals }
						onInput={ event => setHomeGoals(event.target.value)}
					/>)
				 }</td>

				<td> &times; </td>

				<td className="goals">{
					editLine !== props.j
					? props.golsVisitante
					: (<input
						value={ awayGoals }
						onInput={ event => setAwayGoals(event.target.value)}
					/>)
				}</td>
				
				<td className="awayTeam"> { props.timeVisitante } </td>

				<td>
					{editLine === props.j
						? (<button
							onClick={ (event) => {
								console.log(props.id, homeGoals, awayGoals, token)
								editMatch	(
									props.id,
                                    homeGoals,
                                    awayGoals,
									token
								).then( (event2) => {
									gamesPerRound();
									catchTable();
								})
								
								setHomeGoals(undefined);
								setAwayGoals(undefined);
								setEditLine(null);
							}}
						>
							<img src={ Images.check } alt="confirmar alteração" title="confirmar alteração"/>
						</button>)
						:  token ? (<button
							onClick={ () => {
								setEditLine(props.j);
								setHomeGoals(props.golsCasa);
								setAwayGoals(props.golsVisitante);
							}}
						>
							<img src={ Images.pen } alt="editar placar do jogo" title="editar placar do jogo"/>
						</button>) : null}
				</td>
			</tr>
		)
	};

	return (
		<div className="round">
			<RoundHeader />

			<div className="roundBody">
				<table cellSpacing={0}>
					<tbody>
						{ matches.map( (r, i) => {
							return (
								<RoundBody 
									j={i}
									id={r.id}
									timeCasa={r.time_casa}
									timeVisitante={r.time_visitante}
									golsCasa={r.gols_casa}
									golsVisitante={r.gols_visitante}
								/>
							);
						}) }
					</tbody>
				</table>
			</div>
		</div>
	)

};