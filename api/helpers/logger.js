let logCtrl = require('../controllers/logs.controller')

module.exports = (data) => {
    let arrData = data.split('$')
    // console.log("split data is" , arrData);
    let ln = arrData.length;
    let status_code = arrData[ln-2]
    let user_agent = arrData[ln-3]
    let ip_address = arrData[ln-4]
    let api_route = arrData[ln-5]
    let method = arrData[ln-6].split('"')[1]
    let date_time = arrData[1]
    let resp_time = Number(arrData[ln-1].split('\n')[0])
    if(isNaN(resp_time)){
        resp_time = 0
    }

    let log = {status_code , user_agent , ip_address ,api_route , method , date_time , resp_time}
    // console.log("log from logger is" , log);
    logCtrl.insertLog(log)

}