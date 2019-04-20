import React from 'react';
import { AppContext } from '../App/AppProvider';
import styled from 'styled-components';
import uuid from 'uuid-v4';
import PriceTile from './PriceTile';

const PriceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 15px;
	margin-top: 40px;
`;

export default () => 
{
	return (
		<AppContext.Consumer>
			{({ prices }) =>(
				<PriceGrid>
					{prices.map((price, index) => (
						<PriceTile key={uuid()} index={index} price={price} />
					))}
				</PriceGrid>	
			)}
		</AppContext.Consumer>
	)
}