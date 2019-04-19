import React from 'react'
import {Component} from 'react';
import WelcomeMessage from './Welcome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid'

export default () =>
{
	return (
		<Page name="settings">
			<WelcomeMessage />
			<ConfirmButton />
			<CoinGrid />
		</Page>
	)
};