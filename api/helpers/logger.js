

module.exports = (data) => {
    let arrData = data.split(' ')
    let ln = arrData.length;
    let statusCode = arrData[ln-2]
    let userAgent = arrData[ln-3]
    let ip = arrData[ln-4]
    let api = arrData[ln-5]
    let method = arrData[ln-6].split('"')[1]
    let dateTime = data.split(']')[0].split('[')[1]
    console.log({statusCode , api, method , ip , userAgent,dateTime});

}