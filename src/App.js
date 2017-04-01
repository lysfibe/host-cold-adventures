// @flow
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from "react-redux";

import store from './store'

import HomePage from './views/Home/HomeMap'

const Router = StackNavigator({
	home: { screen: HomePage },
})

const App = () => (
	<Provider store={store}>
		<Router />
	</Provider>
)

export default App
