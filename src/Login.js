import React, { Component } from 'react'
import axios from 'axios'

import { setCookie } from './utils'

class Login extends Component {
	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this)

		this.userNameRef = React.createRef()
		this.tokenRef = React.createRef()
	}

	onSubmit(event) {
		event.preventDefault()
		axios
			.post('https://bo-marijuana-server.herokuapp.com/session/login', {
				userName: this.userNameRef.current.value,
				token: this.tokenRef.current.value
			})
			.then(response => {
				if (response.data.success) {
					this.props.onLoggedIn(response)
					setCookie('USER', response.data.token, 3600)
				} else {
					alert(response.data.message)
					setCookie('USER', '', 1)
				}
			})
	}

	render() {
		return (
			<div className='container login-container'>
				<form onSubmit={this.onSubmit}>
					<label>Username : </label>
					<input type='text' required minLength='3' ref={this.userNameRef} />
					<br />
					<label>Token : </label>
					<input type='number' maxLength='6' required ref={this.tokenRef} />
					<br />
					<button type='submit'>Login</button>
				</form>
			</div>
		)
	}
}

export default Login
