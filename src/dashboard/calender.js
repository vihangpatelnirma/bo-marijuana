/* global gapi */
import React, { Component } from 'react'

import { API_KEY, SCOPES, DISCOVERY_DOCS, CLIENT_ID, CALENDER_EMAIL } from './config'

class Calender extends Component {
	constructor() {
		super()
		this.initClient = this.initClient.bind(this)
		this.updateSigninStatus = this.updateSigninStatus.bind(this)
		this.handleAuthClick = this.handleAuthClick.bind(this)
		this.handleSignoutClick = this.handleSignoutClick.bind(this)

		this.handleOnLoad = this.handleOnLoad.bind(this)
		this.scheduleAppointment = this.scheduleAppointment.bind(this)

		this.state = {
			showSignInButton: null
		}

		this.dateRef = React.createRef()
		this.timeRef = React.createRef()
	}

	componentDidMount() {
		window.setTimeout(this.handleOnLoad, 1000)
	}

	handleOnLoad() {
		gapi.load('client:auth2', this.initClient)
	}

	initClient() {
		window.pcb = this.gapiClient = gapi.client.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES
		})
		this.gapiClient.then(() => {
			// Listen for sign-in state changes.
			gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)

			// Handle the initial sign-in state.
			this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
		})
	}

	updateSigninStatus(isSignedIn) {
		this.setState({
			showSignInButton: isSignedIn
		})

		if (isSignedIn) {
			const profile = gapi.auth2
				.getAuthInstance()
				.currentUser.get()
				.getBasicProfile()

			if (profile && profile.getEmail() === CALENDER_EMAIL) {
				return
			}

			this.handleSignoutClick()
			this.setState({
				showSignInButton: false
			})
			alert(`${profile.getEmail()} is not granted access to calenders. \nPlease login with ${CALENDER_EMAIL}`)

			return
		}
	}

	handleAuthClick() {
		gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(response => {
				console.log(response)
			})
	}

	/**
	 *  Sign out the user upon button click.
	 */
	handleSignoutClick() {
		gapi.auth2.getAuthInstance().signOut()
	}

	renderSignInStatus() {
		const { showSignInButton } = this.state

		return (
			<div>
				{showSignInButton !== null &&
					!showSignInButton && (
						<button onClick={this.handleAuthClick} className=''>
							{`Sign In as ${CALENDER_EMAIL}`}
						</button>
					)}
				{showSignInButton && (
					<button onClick={this.handleSignoutClick} className=''>
						{`Sign Out (${CALENDER_EMAIL})`}
					</button>
				)}
			</div>
		)
	}

	scheduleAppointment() {
		const { value: date } = this.dateRef.current
		const { value: time } = this.timeRef.current
		const { office, email } = this.props.storeData

		if (!date.length || !time.length) {
			alert('Provide date')
			return
		}

		const appointmentTime = new Date(`${date}T${time}`)
		const event = {
			summary: '',
			location: 'Rockledge Office',
			description: `Natural Clinic MD Appointment on ${appointmentTime.toLocaleDateString()}`,
			start: {
				dateTime: appointmentTime.toISOString(),
				timeZone: 'America/Florida'
			},
			end: {
				dateTime: appointmentTime.toISOString(),
				timeZone: 'America/Florida'
			},
			recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
			attendees: [{ email: CALENDER_EMAIL }, { email }],
			reminders: {
				useDefault: false,
				overrides: [{ method: 'email', minutes: 24 * 60 }, { method: 'popup', minutes: 10 }]
			}
		}

		console.log(event)

		const request = gapi.client.calendar.events.insert({
			calendarId: 'primary',
			resource: event
		})

		request.execute(function(calEvent) {
			console.log('Event created: ', calEvent)
		})
	}

	render() {
		const { showSignInButton } = this.state
		return (
			<div className='information-container'>
				<div className='container-header'>Calender</div>
				<div className='inner-wrapper'>
					<input type='date' ref={this.dateRef} />
					<input type='time' ref={this.timeRef} />
					{showSignInButton && <button onClick={this.scheduleAppointment}> Schedule An Appointment</button>}
					{this.renderSignInStatus()}
				</div>
			</div>
		)
	}
}

export default Calender
