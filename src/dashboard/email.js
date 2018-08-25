import React, { Component } from 'react'

import templates from './templates'
import { selectText } from './config'

class Email extends Component {
	constructor() {
		super()

		this.onTemplateFormatChage = this.onTemplateFormatChage.bind(this)
		this.onSaveAndEmail = this.onSaveAndEmail.bind(this)
		this.state = {
			selectedTemplate: null
		}

		this.titleRef = React.createRef()
		this.bodyRef = React.createRef()
	}

	onSaveAndEmail() {
		if (!this.titleRef.current || !this.bodyRef.current) {
			return
		}

		const title = this.titleRef.current.value
		const body = this.bodyRef.current.value

		if (!title || !body) {
			alert('Please select mail format')
			return
		}

		this.props.onSaveAndEmail({ title, body })
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
								ref={this.titleRef}
								placeHolder='Title'
								className='email-title'
								defaultValue={templates[selectedTemplate].title()}
							/>
							<br />
							Body :
							<textarea
								ref={this.bodyRef}
								placeHolder='Body'
								className='email-body'
								defaultValue={templates[selectedTemplate].body()}
							/>
						</div>
					)}
				</div>
				<button onClick={this.onSaveAndEmail}>SAVE & EMAIL</button>
			</div>
		)
	}
}

export default Email
