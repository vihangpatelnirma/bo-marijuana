import React, { Component } from 'react'
import axios from 'axios'

import Form from './form'
import Email from './email'
import Calender from './calender'

class Dashboard extends Component {
	constructor() {
		super()

		this.state = { form: {} }

		this.storeData = this.storeData.bind(this)
		this.onSaveAndEmail = this.onSaveAndEmail.bind(this)
	}

	storeData(data) {
		this.setState({
			form: data
		})
	}

	onSaveAndEmail(data) {
		this.setState({
			email: data
		})

		const payload = {
			...this.state.form,
			mailOptions: data
		}

		Object.keys(payload).forEach(_ => (!payload[_] ? delete payload[_] : ''))

		axios.post('http://bo-marijuana-server.herokuapp.com/save-in-db', payload).then(response => {
			console.log(response)
		})
	}

	render() {
		const {
			form: { isValid = true }
		} = this.state
		return (
			<div>
				<Form storeData={this.storeData} />
				{isValid && <Email storeData={this.state.form} onSaveAndEmail={this.onSaveAndEmail} />}
				{isValid && <Calender storeData={this.state.form} />}
			</div>
		)
	}
}

export default Dashboard
