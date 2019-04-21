import React from 'react'
import styled from 'styled-components';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';

const ChartGrid = styled.div`
	display: grid;
	margin-top: 20px;
	grid-gap: 15px;
	grid-template-columns: 1fr 3fr;
`;

export default () =>
{
	return (
		<Page name="dashboard">
			<PriceGrid />
			<ChartGrid>
				<CoinSpotlight />
				<div>chart goes here </div>
			</ChartGrid>
		</Page>
	)
};