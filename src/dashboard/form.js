import React, { Component } from 'react'

import { counties, sourceOfLead, medicalConditions, officeLocations } from './config'
import { validate } from './validation'

class Form extends Component {
	constructor() {
		super()

		this.submit = this.submit.bind(this)
		this.nameRef = React.createRef()
		this.emailRef = React.createRef()
		this.phoneRef = React.createRef()
		this.countyRef = React.createRef()
		this.otherCountyRef = React.createRef()
		this.otherSourceRef = React.createRef()
		this.sourceRef = React.createRef()
		this.medConditionRef = React.createRef()
		this.officeLocationRef = React.createRef()
	}

	submit(event) {
		event.preventDefault()

		const name = this.nameRef.current.value
		const email = this.emailRef.current.value
		const phone = this.phoneRef.current.value
		const resident = this.countyRef.current.value
		const otherCounty = this.otherCountyRef.current.value
		const source = Array.prototype.slice
			.call(this.sourceRef.current.querySelectorAll('[type=checkbox]:checked'))
			.map(item => item.value)
			.join(',')
		const otherSource = this.otherSourceRef.current.value
		const condition = this.medConditionRef.current.value
		let office = this.officeLocationRef.current.querySelector('[type=radio]:checked')

		office = office ? office.value : ''

		const isValid = validate({
			name,
			email,
			phone,
			resident,
			otherCounty,
			source,
			otherSource,
			condition,
			office
		})

		this.props.storeData({
			isValid,
			name,
			email,
			phone,
			resident,
			otherCounty,
			source,
			otherSource,
			condition,
			office,
			treatment: 'NA'
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
						<input type='number' required ref={this.phoneRef} />
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
					<div ref={this.officeLocationRef}>
						Office Location :
						{officeLocations.map(loc => (
							<div key={loc.code}>
								<input
									id={loc.code}
									name='office-location'
									type='radio'
									key={loc.code}
									value={loc.code}
								/>
								<label htmlFor={loc.code}>{loc.name} </label>
							</div>
						))}
					</div>
				</div>
				<button type='submit'> NEXT </button>
			</form>
		)
	}
}

export default Form
