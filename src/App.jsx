import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Round } from "./components/Round";
import { Table } from "./components/Table";

const fetchJson = (url) => fetch(url).then((res) => res.json());

function App() {

	const [table, setTable] = React.useState([]);
	const [token, setToken] = React.useState(null);

	function catchTable () {
		fetchJson(`https://desafio-3-back-cubos-academy.herokuapp.com/classificacao`)
		.then(({ dados }) => {
			setTable( dados );
			})
	}

  return (
    <div className="App">
    	<header>
        	<div className="center">
        		<h1>Brasileirão</h1>

        		<Login token={token} setToken={setToken}/>
        	</div>
    	</header>

      <div className="body">
        <div className="centerBody">
          <div className="round">
            <Round token={token} setToken={setToken} catchTable={catchTable}/>
          </div>

          <div className="table">
            <Table table={table} setTable={setTable} catchTable={catchTable}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
