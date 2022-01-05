const jwt = require('jsonwebtoken');
const axios = require('axios');
const dayjs = require('dayjs');



module.exports = {
	createMeeting
	

};





const config = {

	APIKey: 'rVxSKDaAQOaJolwVicwtSg',
	APISecret: 'ds4zmNw7Od8KypTItqeiKsAa2p6p7mg883py'

};






const payload = {
	iss: config.APIKey,
	exp: ((new Date()).getTime() + 50000)
};
const token = jwt.sign(payload, config.APISecret);





async function createMeeting(mt_start_time) {

	//store the email address of the user in the email variable
	// email = req.body.email;
	// //check if the email was stored in the console
	// console.log(email);
	
	let start_time = dayjs(mt_start_time).toDate()

	var config = {
		method: 'post',
		url: 'https://api.zoom.us/v2/users/me/meetings',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: {
			start_time: start_time,
			type: 2,
			pre_schedule: false
		}

	};
	try {
		let meet = await axios(config);
		meet.data.done = true;
		return meet.data;
	} catch (error) {
		return error;
	}
	
		// .then(function (response) {
		// 	console.log(JSON.stringify(response.data));
		// 	response.data.done = true;
		// 	return response.data;
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// 	return error;
		// });




}