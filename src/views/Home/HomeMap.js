// @flow
import React, { PureComponent } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import mapstyle from './mapstyle'

import { colors } from '../../theme'
import { container } from '../../util/colors'

import Button from '../../ui/Button'

export type Region = {
	longitude: number,
	latitude: number,
	latitudeDelta: number,
	longitudeDelta: number,
}

type State = {
	region: Region,
}

export default class HomeMap extends PureComponent {
	static navigationOptions = {
		header: {
			visible: false,
		}
	}

	state: State = {
		region: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		}
	}

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
			({coords}) => this.setLatLong(coords),
			(...args) => console.log(args) || alert('Oops!'),
			{enableHighAccuracy: true}
		)
	}

	render() {
		const {width, height} = Dimensions.get('window')
		return (
			<View style={{flex: 1}}>
				<MapView
					region={this.state.region}
					onRegionChange={region => this.setState({region})}
					customMapStyle={mapstyle}
					style={{width, height: height - 24}}
				/>
				<View style={[styles.verticalLine, {left: width / 2}]}/>
				<View style={[styles.horizontalLine, {top: height / 2}]}/>
				<Button
					containerStyle={[ styles.buttonContainer, container(colors.palette.blue) ]}
					onPress={this.goToRader}
					style={styles.button}
				>
					Lets Go!
				</Button>
			</View>
		)
	}

	setLatLong = ({latitude, longitude}) =>
		this.setState(state => ({
			region: {
				...state.region,
				latitude,
				longitude,
			}
		}))

	getSelectedLocation = () => {
		const { latitude, longitude } = this.state.region
		return {
			longitude,
			latitude,
		}
	}

	goToRader = () => {
		const { navigate } = this.props.navigation
		const { latitude, longitude } = this.getSelectedLocation()
		navigate('locator', { target: { latitude, longitude } })
	}
}


const styles = StyleSheet.create({
	verticalLine: {
		borderRightWidth: StyleSheet.hairlineWidth,
		borderRightColor: colors.shades.offwhite,
		position: 'absolute',
		top: 0,
		bottom: 0,
	},
	horizontalLine: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: colors.shades.offwhite,
		position: 'absolute',
		left: 0,
		right: 0,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 35,
		left: 10,
		right: 10,
		padding: 10,
	},
	button: {
		color: colors.shades.white,
		textAlign: 'center',
	}
})
