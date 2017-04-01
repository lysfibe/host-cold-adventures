// @flow
import React, { PureComponent } from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import mapstyle from './mapstyle'

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

	render() {
		const { width, height } = Dimensions.get('window')
		return (
			<View>
				<MapView
					region={this.state.region}
					onRegionChange={region => console.log(region) || this.setState({ region })}
					customMapStyle={mapstyle}
					style={{ width, height: height - 25 }}
				/>
			</View>
		)
	}
}
