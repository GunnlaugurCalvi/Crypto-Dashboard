import React from 'react';
import { Component, createContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

//cryptocompare API wrapper
const cc = require('cryptocompare');

const AppContext = createContext();
const MAX_FAVORITES = 15;
class AppProvider extends Component {

	constructor(props)
	{
		super(props);

		this.state =
		{
			page: 'dashboard',
			favorites: ['BTC', 'ETH', 'XMR', 'GRIN', 'DOGE', 'NANO'],
			...this.savedSettings(),
			setPage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			confirmFavorites: this.confirmFavorites,
			setFilteredCoins: this.setFilteredCoins,
			setCurrentFavorite: this.setCurrentFavorite,
		}
	}

	componentDidMount = () =>
	{
		this.fetchCoins();
		this.fetchPrices();
	}

	fetchCoins = async () => 
	{
		let coinList = (await cc.coinList()).Data;
		this.setState({coinList});
	}

	fetchPrices = async () => 
	{
		if (this.state.firstVisit)
			return;
		let prices = await this.prices();
		this.setState({prices});
	}

	prices = async () => 
	{
		let returnData = [];
		for (let i = 0; i < this.state.favorites.length; i++)
		{
			try
			{
				let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
				returnData.push(priceData);
			}
			catch (err)
			{
				console.warn('Fetch price error: ', err);
			}
		}
		return returnData;
	}

	addCoin = key =>
	{
		let favorites = [...this.state.favorites];
		if (favorites.length  < MAX_FAVORITES)
		{
			favorites.push(key);
			this.setState({favorites});
		}
		else
		{
			alert('Max 15 coins as favorites!');		
		}
	}

	removeCoin = key =>
	{
		let favorites = [...this.state.favorites];
		this.setState({favorites: _.pull(favorites, key)});	
	}

	isInFavorites = key => _.includes(this.state.favorites, key)

	confirmFavorites = () =>
	{
		let currentFavorite = this.state.favorites[0];
		this.setState({
			firstVisit: false,
			page: 'dashboard',
			currentFavorite,
		}, () => {
			this.fetchPrices();
		});

		localStorage.setItem('cryptoDash', JSON.stringify({
			favorites: this.state.favorites,
			currentFavorite,
		}));
	}

	setCurrentFavorite = sym => 
	{
		this.setState(
		{
			currentFavorite: sym
		});
		
		localStorage.setItem('cryptoDash', JSON.stringify({
			...JSON.parse(localStorage.getItem('cryptoDash')),
			currentFavorite: sym
		}))
	}

	savedSettings()
	{
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if (!cryptoDashData)
			return {page: 'settings', firstVisit: true};

		let {favorites, currentFavorite} = cryptoDashData;
		return {favorites, currentFavorite};
	}

	setPage = page => this.setState({page});

	setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

	render()
	{
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}

export {AppProvider, AppContext};