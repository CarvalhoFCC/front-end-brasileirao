import React from 'react';
import { Images } from '../images/Images';

export function Table (props) {

	const [orderedColumn, setOrderedColumn] = React.useState("pontos");
	const [order, setOrder] = React.useState("ascending");
	const { table, setTable, catchTable } = props;

	

	React.useEffect( () => {
		catchTable();	
	}, []
	);

	table.forEach((element, i) => {
		table[i].saldoGols = table[i].golsFeitos - table[i].golsSofridos;
		table[i].posicao = table.indexOf(element) + 1;
	});
	
	const columns = ["posicao", "nome", "pontos", "empates", "vitorias", "derrotas", "golsFeitos", "golsSofridos", "saldoGols"];

	const translation = {
		posicao: "Posição",
		nome: "Time",
		pontos: "PTS",
		golsFeitos: "GF",
		golsSofridos: "GS",
		saldoGols: "SG",
		vitorias: "V",
		empates: "E",
		derrotas: "D",
	};

	const ascendingDatas = table.sort( (d1, d2) => {
		if(
			typeof d1[orderedColumn] === "number" &&
			typeof d2[orderedColumn] === "number"
		) {
			return (
				parseInt(d2[orderedColumn], 10) -
				parseInt(d1[orderedColumn], 10)
			);
		} else {
			return d1[orderedColumn].localeCompare(d2[orderedColumn]);
		}
	});

	const sortedDatas = order === "ascending" ? ascendingDatas : ascendingDatas.reverse();

	return (
		<div>
			<table cellSpacing={0} className="table">
				<thead className="tableHeader">
					<tr>
						{columns.map( itemOfColumns => (
							<th>
								{translation[itemOfColumns]}
								<button 
									onClick={ () => {
										if (orderedColumn === itemOfColumns) {
											setOrder((order) => (
												order === "descending"
												? "ascending"
												: "descending"
											))
										}else {
											setOrderedColumn(itemOfColumns);
												setOrder("ascending");
										}
									}}
								>
									{orderedColumn !== itemOfColumns
										? <img src={Images.sort} alt="não ordenado"/>
										: order === "descending"
										? <img src={Images.arrowDown} alt="descendente"/>
										: <img src={Images.arrowUp} alt="ascendente"/>
									}
								</button>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{sortedDatas.map( (team, i) => (
						<tr>
							{columns.map( (itemOfColumn) => (
								<td>{ team[itemOfColumn] }</td>
							))}
						</tr>
					))}
				</tbody>	
			</table>
		</div>
	);
};