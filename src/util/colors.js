import Color from 'color'
export function container(color: string) {
	const c = Color(color)

	return {
		backgroundColor: c.hex(),
		borderColor: c.darken(0.3).hex(),
	}
}
