// @flow
import React from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Text } from 'react-native'

type Props = {
	onPress?: () => void,
	onLongPress?: () => void,
	containerStyle?: Object | Array,
	style?: Object | Array,
	highlight?: boolean,
	noFeedback?: boolean,
}

const Button = ({ onPress, onLongPress, containerStyle, noFeedback, highlight, as: As = Text, ...props }: Props) => {
	let Touchable = TouchableOpacity
	if (noFeedback) {
		Touchable = TouchableWithoutFeedback
	} else if (highlight) {
		Touchable = TouchableHighlight
	}

	return (
		<Touchable onPress={onPress} onLongPress={onLongPress} style={containerStyle}>
			<As {...props} />
		</Touchable>
	)
}

export default Button
