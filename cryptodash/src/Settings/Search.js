import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { backgroundColor2, fontSize2 } from '../Shared/Styles'; 
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
	display: grid;
	grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
	${backgroundColor2};
	${fontSize2};
	border: 1px solid;
	height: 25px;
	place-self: center left;
	color: #1163c9;	
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
	//Get all coin symbols
	let coinSymbols = Object.keys(coinList);
	//Get all the coin names, map symbols to name
	let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
	let allStringsToSearch = coinSymbols.concat(coinNames);
	let fuzzyFilter = fuzzy.filter(inputValue, allStringsToSearch, {}).map(res => res.string);
	let filteredCoins = _.pickBy(coinList, (res, symKey) => {
		let coinName = res.CoinName;
		return (_.includes(fuzzyFilter, symKey) || _.includes(fuzzyFilter, coinName));
	});

	setFilteredCoins(filteredCoins);

}, 500);

function filterCoins(e, setFilteredCoins, coinList)
{
	let inputValue = e.target.value;
	if (!inputValue)
	{
		setFilteredCoins(null); 
		return;
	}
	handleFilter(inputValue, coinList, setFilteredCoins);
}

export default () =>
{
	return (
		<AppContext.Consumer>
			{({setFilteredCoins, coinList}) =>
				<SearchGrid> 
					<h2>Search all coins</h2>
					<SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
				</SearchGrid>
			}	
		</AppContext.Consumer>
	)
}