import React from 'react'
import {Component} from 'react';
import WelcomeMessage from './Welcome';
import ConfirmButton from './ConfirmButton';

export default () =>
{
	return (
		<div>
			<WelcomeMessage />
			<ConfirmButton />
		</div>
	)
};