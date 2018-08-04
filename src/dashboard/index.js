import React, { Component } from 'react'

import Form from './form'
import Email from './email'
import Calender from './calender'

class Dashboard extends Component {
	constructor() {
		super()

		this.state = { form: {} }

		this.storeData = this.storeData.bind(this)
	}

	storeData(data) {
		this.setState({
			form: data
		})
	}

	render() {
		const {
			form: { isValid = true }
		} = this.state
		return (
			<div>
				<Form storeData={this.storeData} />
				{isValid && <Email storeData={this.state.form} />}
				{isValid && <Calender storeData={this.state.form} />}
			</div>
		)
	}
}

export default Dashboard
