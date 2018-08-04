import React, { Component } from 'react'

import templates from './templates'
import { selectText } from './config'

class Email extends Component {
	constructor() {
		super()

		this.onTemplateFormatChage = this.onTemplateFormatChage.bind(this)

		this.state = {
			selectedTemplate: null
		}
	}

	onTemplateFormatChage(event) {
		event.persist()
		this.setState({
			selectedTemplate: event.target.value
		})
	}

	render() {
		const { selectedTemplate } = this.state

		return (
			<div className='information-container'>
				<div className='container-header'>Email</div>
				<div className='inner-wrapper'>
					Select Template:
					<select onChange={this.onTemplateFormatChage}>
						{[selectText, ...Object.keys(templates)].map(templateName => (
							<option key={templateName} value={templateName}>
								{templateName}
							</option>
						))}
					</select>
					{selectedTemplate && (
						<div key={selectedTemplate}>
							Title :
							<input
								placeHolder='Title'
								className='email-title'
								defaultValue={templates[selectedTemplate].title()}
							/>
							<br />
							Body :
							<textarea
								placeHolder='Body'
								className='email-body'
								defaultValue={templates[selectedTemplate].body()}
							/>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default Email
