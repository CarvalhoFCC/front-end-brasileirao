const { isCompositeComponentWithType } = require("react-dom/test-utils");

const obj = [
	{
		nome: "ja",
		um: 5,
		dois: 2,
	},
	{
		nome: "ka",
		um: 4,
		dois: 2,
	},
	{
		nome: "ta",
		um: 3,
		dois: 2,
	},
]

const novo = obj.map( (item) => {
	item.soma = item.um + item.dois;
})

console.log(obj);