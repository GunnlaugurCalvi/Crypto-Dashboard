import React from 'react';
import { Component, createContext } from 'react';
import styled from 'styled-components';

const AppContext = createContext();

class AppProvider extends Component {

	constructor(props)
	{
		super(props);

		this.state =
		{
			page: 'dashboard',
			...this.savedSettings(),
			setPage: this.setPage,
			confirmFavorites: this.confirmFavorites
		}

		this.setPage = this.setPage.bind(this);
	}

	confirmFavorites = () =>
	{
		this.setState({
			firstVisit: false,
			page: 'dashboard'
		});

		localStorage.setItem('cryptoDash', JSON.stringify({
			test: 'hello'
		}));
	}

	savedSettings()
	{
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if (!cryptoDashData)
			return {page: 'settings', firstVisit: true};
		return {}
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