import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

import Dashboard from './dashboard'
import IndeterminateLoader from './IndeterminateLoader'
import Login from './Login'
import { getCookie } from './utils'

class App extends Component {
	constructor() {
		super()

		this.state = {
			isLoggedIn: null
		}

		this.onLoggedIn = this.onLoggedIn.bind(this)
	}

	onLoggedIn() {
		this.setState({
			isLoggedIn: true
		})
	}

	componentDidMount() {
		axios
			.post('http://bo-marijuana-server.herokuapp.com/session/validate', {
				token: getCookie('USER')
			})
			.then(response => {
				this.setState({
					isLoggedIn: response.data.success
				})
			})
	}

	render() {
		const { isLoggedIn } = this.state
		return (
			<div className='App'>
				<header className='App-header'>
					<img src='https://www.naturalclinicmd.com/images/logo.png' className='App-logo' alt='logo' />
					<h1 className='App-title'>Back Office</h1>
				</header>
				{isLoggedIn === null && <IndeterminateLoader />}
				{isLoggedIn === false && <Login onLoggedIn={this.onLoggedIn} />}
				{isLoggedIn === true && <Dashboard />}
			</div>
		)
	}
}

export default App
