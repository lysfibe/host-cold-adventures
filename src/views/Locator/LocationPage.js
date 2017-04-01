// @flow
import React, { PureComponent } from 'react'
import { ScrollView, Text, View, Image, StyleSheet, Dimensions, Animated } from 'react-native'
import { getDistance } from 'geolib'
import { colors } from '../../theme'

export default class LocationPage extends PureComponent {

	static navigationOptions = {
		title: 'Location'
	}

	val = new Animated.Value(50)

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
		this.twing()
		console.log(this.navProps)
		navigator.geolocation.getCurrentPosition(
			({ coords }) => this.setState({ initialLocation: coords, targetLocation: this.navProps.target, pings: [coords] },
				() => this.setState({ distanceScale: this.getInitalDistance() }
			)),
			(...args) => console.log(...args) || alert('Oops!'),
			{ enableHighAccuracy: true }
		)

		this.interval = setInterval(this.poll, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		var interpolatedRotateAnimation = this.val.interpolate({
			inputRange: [0, 100],
			outputRange: ['0deg', '360deg']
		});
		const { width, height } = Dimensions.get('window')
		return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1, margin: 10, backgroundColor: colors.shades.offwhite }}>
				<Text style={{ fontSize: 100, textAlign: 'center' }}>
					{this.getCurrentDistance()}m away
				</Text>
				{ this.state.pings.map((ping, i) => (
					<Text key={String(i) + JSON.stringify(ping)}>{ ping.latitude } | { ping.longitude }</Text>
				))}
			</ScrollView>
			<View style={{ flex: 1 }}>
				<Image source={require('../../resources/scale.png')} style={[styles.image, { bottom: 80, width: width - 40 }]} imageMode="stretch"/>
				<Animated.View
					style={
						[
							{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
							{transform: [{rotate: interpolatedRotateAnimation}]}
						]
					}
				>
					<Image source={require('../../resources/pointer.png')} style={[styles.image, { bottom: 20, left: width/2 - 62 }]} imageMode="stretch"/>
				</Animated.View>
				<Image source={require('../../resources/snowflake.png')} style={[styles.image, { bottom: 10, left: 5 }]} imageMode="stretch"/>
				<Image source={require('../../resources/fire.png')} style={[styles.image, { bottom: 10, right: 10 }]} imageMode="stretch"/>
			</View>
		</View>
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

	twing = () => {
		Animated.timing(this.val, {
			toValue: 100,
			duration: 1000,
		}).start(this.twang);
	}

	twang = () => {
		Animated.timing(this.val, {
			toValue: 0,
			duration: 1000,
		}).start(this.twing);
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

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.shades.darkgrey,
		flex: 1,
	},
	image: {
		position: 'absolute',
		bottom: 60,
		flex: 1,
		marginHorizontal: 20,
	},
})
