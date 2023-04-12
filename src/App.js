// import { Component } from 'react';
import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
	const [searchField, setSearchField] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);
	// console.log({ searchField });

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchField);
		});

		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (event) => {
		// console.log({ startingArray: this.state.monsters });
		const searchFieldString = event.target.value.toLowerCase();
		setSearchField(searchFieldString);
	};

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>
			<SearchBox
				className="monsters-search-box"
				onChangeHandler={onSearchChange}
				placeholder="search monster"
			/>

			<CardList monsters={filteredMonsters} />
		</div>
	);
};

/*class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: '',
		};
		console.log('contractor');
	}

	componentDidMount() {
		console.log('componentDidMount');
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) =>
				this.setState(
					() => {
						return { monsters: users };
					},
					() => {
						console.log(this.state);
					}
				)
			);
	}

	onSearchChange = (event) => {
		// console.log({ startingArray: this.state.monsters });
		const searchField = event.target.value.toLowerCase();

		this.setState(() => {
			return { searchField };
		});
	};

	render() {
		console.log('render');

		const filteredMonsters = this.state.monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(this.state.searchField);
		});

		return (
			<div className="App">
				<h1 className="app-title">Monsters Rolodex</h1>
				<SearchBox
					className="monsters-search-box"
					onChangeHandler={this.onSearchChange}
					placeholder="search monster"
				/>
				{filteredMonsters.map((monster) => {
					return (
						<div>
							<h1>{monster.name}</h1>
						</div>
					);
				})}
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
} */

export default App;
