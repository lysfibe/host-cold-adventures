// @flow
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Dimensions } from 'react-native'
import Button from '../../ui/Button'
import { colors } from '../../theme'
import { container } from '../../util/colors'

import MapView from 'react-native-maps';

export default class HomePage extends PureComponent {
	static navigationOptions = {
		title: 'Home',
		header: {
			visible: false,
		}
	}

	render() {
		const { width, height } = Dimensions.get('window')
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.title}>
					<Image source={require('../../resources/title.png')} resizeMode="stretch" style={{ flex: 1, width }} />
				</View>
				<View style={{ flex: 3 }}>
					<View style={{ margin: 10 }}>
						<TextInput underlineColorAndroid="transparent" style={styles.input}/>
						<Button containerStyle={[styles.buttonContainer, container(colors.palette.blue)]} style={styles.button}>
							Let's go!
						</Button>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: colors.shades.white,
		borderColor: colors.shades.lightgrey,
		borderWidth: 1,
		marginBottom: 10,
	},
	buttonContainer: {
		padding: 10,
		borderWidth: 1,
	},
	button: {
		textAlign: 'center',
		color: colors.shades.offwhite,
	},
	title: {
		flex: 2,
		backgroundColor: 'grey'
	}
})
