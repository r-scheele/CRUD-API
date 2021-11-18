/**
 * Send an error JSON
 * @param res - response object
 * @param code - status code
 * @param message - error message
 * @returns {Object} - JSON response
 */
const errorResMsg = ({ res, err, message }) => {
	const { statusCode, error } = err
	res.status(statusCode).json({
		error,
		message,
		statusCode,
	})
}

/**
 * Success JSON to be sent
 * @param res - response Object
 * @param code - status code
 * @param data- data to be sent, it requires a data object
 * @returns {Object} - JSON response
 */
const successResMsg = ({ res, success, code, data, message }) =>
	res.status(code).json({
		success,
		data,
		message,
	})

const redirect = (res, url) => res.status(302).redirect(url)

module.exports = {
	errorResMsg,
	successResMsg,
	redirect,
}
