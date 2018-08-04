import React, { Component } from 'react'

import { counties, sourceOfLead, medicalConditions } from './config'
import { validate } from './validation'

class Form extends Component {
	constructor() {
		super()

		this.submit = this.submit.bind(this)
		this.nameRef = React.createRef()
		this.emailRef = React.createRef()
		this.contactRef = React.createRef()
		this.countyRef = React.createRef()
		this.otherCountyRef = React.createRef()
		this.otherSourceRef = React.createRef()
		this.sourceRef = React.createRef()
		this.medConditionRef = React.createRef()
	}

	submit(event) {
		event.preventDefault()

		const name = this.nameRef.current.value
		const email = this.emailRef.current.value
		const contact = this.contactRef.current.value
		const county = this.countyRef.current.value
		const otherCounty = this.otherCountyRef.current.value
		const source = Array.prototype.slice
			.call(this.sourceRef.current.querySelectorAll('[type=checkbox]:checked'))
			.map(item => item.value)
			.join(',')
		const otherSource = this.otherSourceRef.current.value
		const medicalCondition = this.medConditionRef.current.value

		const isValid = validate({
			name,
			email,
			contact,
			county,
			otherCounty,
			source,
			otherSource,
			medicalCondition
		})

		this.props.storeData({
			isValid,
			name,
			email,
			contact,
			county,
			otherCounty,
			source,
			otherSource,
			medicalCondition
		})
	}

	assignRef(fieldName, ref) {
		this[`ref${fieldName}`] = ref
	}

	render() {
		return (
			<form className='information-container' onSubmit={this.submit}>
				<div className='container-header'>USER DETAILS</div>
				<div className='inner-wrapper'>
					<div className='input-wrapper'>
						Name :
						<input type='text' required ref={this.nameRef} />
					</div>
					<div className='input-wrapper'>
						Email :
						<input type='email' required ref={this.emailRef} />
					</div>
					<div className='input-wrapper'>
						Phone Number :
						<input type='number' required ref={this.contactRef} />
					</div>
					<div className='input-wrapper'>
						County :
						<select ref={this.countyRef}>
							{counties.map(county => (
								<option key={county} value={county}>
									{county}
								</option>
							))}
						</select>
						Other:
						<input type='text' ref={this.otherCountyRef} />
					</div>
					<div className='input-wrapper' ref={this.sourceRef}>
						Source of Lead:
						{sourceOfLead.map(source => (
							<div key={source}>
								<input id={source} type='checkbox' key={source} value={source} />
								<label htmlFor={source}>{source} </label>
							</div>
						))}
						<input type='text' ref={this.otherSourceRef} />
					</div>
					<div className='input-wrapper'>
						Medical Condition :
						<select ref={this.medConditionRef}>
							{medicalConditions.map(medCondition => (
								<option key={medCondition} value={medCondition}>
									{medCondition}
								</option>
							))}
						</select>
					</div>
					<div />
				</div>
				<button type='submit'> NEXT </button>
			</form>
		)
	}
}

export default Form
