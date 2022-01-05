const jwt = require('jsonwebtoken');
const axios = require('axios');
const dayjs = require('dayjs');
const preferenceService = require('../dal/preferences.dao');


module.exports = {
	createMeeting,
	testZoomMeeting
};




async function testZoomMeeting(req,res) {
	let result =  await createMeeting('hsjkdh sdusbd');
	res.send(result);
}





async function createMeeting(mt_start_time) {

	//store the email address of the user in the email variable
	// email = req.body.email;
	// //check if the email was stored in the console
	// console.log(email);


	const zoom_key = await preferenceService.findWhere({ where:{option_name:'zoom_key'} , raw:true});
	const zoom_secret = await preferenceService.findWhere({ where:{option_name:'zoom_secret'} , raw:true});
	// return {zoom_key , zoom_secret };
	const configmain = {

		APIKey: zoom_key[0].option_value,
		APISecret: zoom_secret[0].option_value

	};






	const payload = {
		iss: configmain.APIKey,
		exp: ((new Date()).getTime() + 50000)
	};
	const token = jwt.sign(payload, configmain.APISecret);



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