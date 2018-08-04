import { selectText } from './config'

export const NAME_REGEX = '^[A-Za-z\\s]+$'
export const EMAIL_REGEX = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'
export const PHONE_NO_REGEX = '^[6789]\\d{9}$'
export const ALPHA_NUMERIC = '[0-9a-zA-Z]+'

export const validate = dataObj => {
	return (
		validateName(dataObj.name) &&
		validateEmail(dataObj.email) &&
		validateContact(dataObj.contact) &&
		validateCounty(dataObj.county, dataObj.otherCounty) &&
		validateSource(dataObj.source, dataObj.otherSource) &&
		validateMedicalCondition(dataObj.medicalCondition)
	)
}

const validateName = name => new RegExp(NAME_REGEX).test(name)
const validateEmail = email => new RegExp(EMAIL_REGEX).test(email)
const validateContact = phone => true || new RegExp(PHONE_NO_REGEX).test(phone)

const validateCounty = (county, otherCounty) =>
	(county !== selectText && otherCounty.trim() === '') || (county === selectText && otherCounty.trim() !== '')

const validateSource = () => true
const validateMedicalCondition = medicalCondition => medicalCondition !== selectText
