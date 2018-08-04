import React, { Component } from 'react'
import './App.css'

import Dashboard from './dashboard'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<img src='https://www.naturalclinicmd.com/images/logo.png' className='App-logo' alt='logo' />
					<h1 className='App-title'>Back Office</h1>
				</header>

				<Dashboard />
			</div>
		)
	}
}

export default App
