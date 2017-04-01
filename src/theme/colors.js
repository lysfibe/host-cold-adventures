// @flow
import Color from 'color'
import { map as objectMap } from '../util/objects'

export type BasicColorPalette = {
	blue: string,
	red: string,
	green: string,
	maroon: string,
	navy: string,
	orange: string,
	yellow: string,
	aqua: string,
}

const palette: BasicColorPalette = {
	aqua: '#7FDBFF',
	blue: '#0074D9',
	navy: '#001f3f',
	maroon: '#85144b',
	red: '#FF4136',
	yellow: '#FFDC00',
	orange: '#FF851B',
	green: '#2ECC40',
}

const shades = {
	white: '#FBFBFB',
	offwhite: '#F5F7F9',
	lightgrey: '#A7A0A1',
	grey: '#4A4546',
	darkgrey: '#302c2d',
	black: '#201D1E',
}

const highlight: BasicColorPalette = objectMap(palette, (name, hex) => Color(hex).lighten(0.3).hex())
const accent: BasicColorPalette = objectMap(palette, (name, hex) => Color(hex).darken(0.3).hex())

export default {
	palette,
	highlight,
	accent,
	shades,
}
