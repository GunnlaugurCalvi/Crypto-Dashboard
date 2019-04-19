import React from 'react';
import styled from 'styled-components';
import { Deletabletile } from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`

export const CoinSymbol = styled.div`
	justify-self: right;
`
export const DeleteIcon = styled.div`
	justify-self: right;
	display: none;
	${Deletabletile}:hover & {
		display: block;
		color: red;
	}
`

export default ({name, symbol, topSection}) =>
{
	return (
		<CoinHeaderGridStyled>
			<div> { name }</div>
			{topSection ? <DeleteIcon> X </DeleteIcon> :
			<CoinSymbol> {symbol} </CoinSymbol>}
		</CoinHeaderGridStyled>
	)
}