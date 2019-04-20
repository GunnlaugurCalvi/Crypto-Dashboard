import React from 'react';
import { Component, createContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import toastr from 'toastr';

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
			confirmFavorites: this.confirmFavorites
		}

		this.setPage = this.setPage.bind(this);
	}

	componentDidMount = () =>
	{
		this.fetchCoins();
	}

	fetchCoins = async () => 
	{
		let coinList = (await cc.coinList()).Data;
		this.setState({coinList});
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
			toastr.info('Max fav coins is 15')
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
		this.setState({
			firstVisit: false,
			page: 'dashboard'
		});

		localStorage.setItem('cryptoDash', JSON.stringify({
			favorites: this.state.favorites
		}));
	}

	savedSettings()
	{
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if (!cryptoDashData)
			return {page: 'settings', firstVisit: true};

		let {favorites} = cryptoDashData;
		return {favorites};
	}

	setPage = page => this.setState({page});

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