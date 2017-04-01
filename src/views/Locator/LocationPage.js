// @flow
import React, { PureComponent } from 'react'
import { ScrollView, Text } from 'react-native'
import { getDistance } from 'geolib'

export default class LocationPage extends PureComponent {

	static navigationOptions = {
		title: 'Location'
	}

	state = {
		initialLocation: {},
		targetLocation: {},
		distanceScale: 0,
		pings: [],
	}

	get navProps() {
		return this.props.navigation.state.params
	}

	componentWillMount() {
		console.log(this.navProps)
		navigator.geolocation.getCurrentPosition(
			({ coords }) => this.setState({ initialLocation: coords, targetLocation: this.navProps.target, pings: [coords], distanceScale: this.getInitalDistance() }),
			(...args) => console.log(...args) || alert('Oops!'),
			{ enableHighAccuracy: true }
		)

		this.interval = setInterval(this.poll, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}>
				<Text style={{ fontSize: 100, textAlign: 'center' }}>
					{this.getCurrentDistance()}m away
				</Text>
				{ this.state.pings.map((ping, i) => (
					<Text key={i}>{ ping.latitude } | { ping.longitude }</Text>
				))}
			</ScrollView>
		)
	}

	addPing = location => this.setState(state => ({ pings: [location].concat(Array.from(state.pings)) }))

	poll = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => this.addPing(coords),
			(...args) => console.log(...args) || alert('Oops!'),
			{ enableHighAccuracy: true }
		)
	}

	getInitalDistance = () => {
		return geolib.getDistance(this.state.initialLocation, this.state.targetLocation)
	}

	getCurrentDistance = () => {
		if (this.state.pings.length) {
			console.log(this.state.targetLocation, this.state.pings[0])
			return geolib.getDistance(this.state.targetLocation, this.state.pings[0])
		} else return 0
	}
}
