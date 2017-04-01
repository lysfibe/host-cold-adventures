export function map(object, fn) {
	return Object.entries(object)
		.map(([key, value]) => [key, fn(key, value)])
		.reduce((obj, [key, value]) => {
			obj[key] = value
			return obj
		}, {})
}
