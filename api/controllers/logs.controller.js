
const logService = require('../dal/logs.dao');
const model = require('../models');
const { QueryTypes } = require('sequelize');
const config = require('../config/config');

module.exports = {
	insertLog,
	deleteLogs
};




async function insertLog(log) {
	let reqObject = { ...log };
	let insertLog = await logService.add(reqObject);
}



async function deleteLogs() {
	let logsQuery = `SELECT COUNT(id) as count,id from logs`;

	const logCount = await model.sequelize.query(logsQuery, { type: QueryTypes.SELECT });

	let logResult = logCount[0];

	let { logCountSpecified } = config;
	let tenPercent = logCountSpecified * Number(`0.10`)

	if (logResult.count > logCountSpecified) {
		console.log(logResult.count, logCountSpecified);
		//id from which the smaller records are to be deleted
		let delMax = Number(logResult.id) + Number(logResult.count - logCountSpecified);

		let logDeleteQuery = `Delete from logs where id < ${delMax}`;

		const logsDelete = await model.sequelize.query(logDeleteQuery, { type: QueryTypes.DELETE });
	}

}

