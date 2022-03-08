const cronjob = require("node-cron");
const Hookbin = require("./message.js");

const Cron = function(cron) {
    this.id         = cron.id;
    this.first_name = cron.first_name;
    this.last_name  = cron.last_name;
    this.birthdate  = cron.birthdate;
    this.location   = cron.location;
};

const taskCron = {};

Cron.job = (data, result) => {

    var dateArr = data.birthdate.split("-");
    var date = dateArr[2];
    var month = dateArr[1];

    const task = cronjob.schedule('* * '+date+' '+month+' *', () => {
        Hookbin.send(data, (result) => {
            console.log(result);
        });
    }, {
        scheduled: true,
        timezone: data.location
    });

    taskCron[data.id] = task;

    result("cronjob create running");
};

Cron.update = (data, result) => {
    let job = taskCron[data.id];
    job.stop();

    var dateArr = data.birthdate.split("-");
    var date = dateArr[2];
    var month = dateArr[1];

    const task = cronjob.schedule('0 9 '+date+' '+month+' *', () => {
        Hookbin.send(data, (result) => {
            console.log(result);
        });
    }, {
        scheduled: true,
        timezone: data.location
    });

    taskCron[data.id] = task;

    result("cronjob update running");
};

Cron.delete = (id, result) => {
    let job = taskCron[id];
    job.stop();

    result("cronjob delete running");
};

module.exports = Cron;