const schedule = require('node-schedule');

module.exports = {
    scheduleJob
}

function scheduleJob(id,date,cb){
    let jobId = String(id)
    date = date.split('-');
    const dateOb = new Date(date[0],(Number(date[1]) - 1) , date[2] ,0 , 0 , 0);
    console.log(dateOb.getHours());
    const job = schedule.scheduleJob(jobId, dateOb, function (fireDate) {
        console.log('The answer to life, the universe,' + fireDate + ' and everything!');
    });
    console.log("the job is" , job.pendingInvocations[0].fireDate);
}