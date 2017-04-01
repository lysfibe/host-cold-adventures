// @flow
import { combineReducers } from 'redux'
import reducer from '@commander-lol/redux-reducer'

const dummy = reducer('value', {
	'SET_DUMMY'({ value }) { return value }
})

const root = combineReducers({
	dummy,
})

export default root
