/* eslint no-console:0, no-param-reassign:0 */
const path = require('path');
const express = require('express');
const app = express();
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const addRequestId = require('express-request-id')();
const morgan = require('morgan');
const routes = require('./routes/index.route');
const config = require('./config/config');
const databaseConfig = require('./config/database');
const sequelize = require('./models/sequelize.connection')(databaseConfig[config.env]);
require('./models').init(sequelize);
const passport = require('./library/passport');
const logger = require('./library/logger');
const fs = require('fs');
const schedule = require('node-schedule');
const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';

logger.initializeGlobalHandlers();

const { authFactory } = require('./middleware/auth-handler');



const corsOptions = {
    //origin:"*"
    origin: config.corsWhiteList,
    credentials: true,
    withCredentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());

app.use(passport.initialize());

app.use(addRequestId);
morgan.token('id', (req) => req.id);
//console.log("request " + req.id + "reached here")
app.use(morgan(loggerFormat, {
    skip(req, res) {
        return res.statusCode < 400;
    },
    stream: process.stderr,
}));
app.use(morgan(loggerFormat, {
    skip(req, res) {
        return res.statusCode >= 400;
    },
    stream: process.stdout,
}));

app.use(authFactory);

// API router

app.use('/api/', routes);
app.use('/static', express.static(path.join(__dirname, '../static')));

app.use((err, req, res, next) => {
    // customize Joi validation errors
    const validationErrorsArray = ['SequelizeValidationError', 'ValidationError', 'SequelizeUniqueConstraintError'];
    if (validationErrorsArray.includes(err.name)) {
        err.status = 422;
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        if (Object.keys(err.fields).includes('users.email')) {
            err.message = 'E-mail already exists.';
        } else {
            err.message = `${err.message} : SequelizeUniqueConstraintError : ${JSON.stringify(err.fields)}`;
        }
    }

    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    });
    next(err);
});
if (!module.parent) {
    const userCtrl = require('./controllers/users.controller')
    const contentCtrl = require('./controllers/content.controller')
    const journalCtrl = require('./controllers/journal.controller')
    let server = app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`);
        //portion to make thumbnails static inside static
        if (!fs.existsSync(path.join(__dirname, '../static'))) {
            console.log("static folder does not exist");
            fs.mkdirSync(path.join(__dirname, '../static'));
        }

        //portion to make thumbnails folder inside static
        if (!fs.existsSync(path.join(__dirname, '../static/thumbnails'))) {
            console.log("static/thumbnails folder does not exist");
            fs.mkdirSync(path.join(__dirname, '../static/thumbnails'));
        }
        userCtrl.removeAllSockets();
        

    });
    console.log("here");
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 0;
    //rule.second = 20;
    const job = schedule.scheduleJob('1', rule, function () {
        console.log("scheduler triggered");
        contentCtrl.checkPendingEmailJobs()
        journalCtrl.outdateJournal()
    });
    
    const socketIo = require('./helpers/socket.io').init(server);

    socketIo.on('connection', socket => {

        console.log('Client connected', socket.id);

        socket.on('login', sid => {
            console.log(sid, " socket-id ", socket.id);
            if (sid.userId) {
                userCtrl.addUserSocket(sid.userId, socket.id);
            }
        })

        socket.on('logout', sid => {
            console.log(sid, " logout-socket-id ", socket.id);
            if (sid.userId) {
                userCtrl.removeAllUserSockets(sid.userId, socket.id);
            }
        })

        socket.on('window', sid => {
            console.log(sid, " window-socket-id ", socket.id);
            if (sid.userId) {
                userCtrl.addWindowSocket(sid.userId, socket.id);
            }
        })

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
            userCtrl.removeUserSocket(socket.id);
        });

    });


}
console.log('Endpoints: \n', listEndpoints(app));

// const model = require('./models/index');

// model.categories.findAll({
//     where: { },
//     include: [{
//         model: model.users,

//     }],
// }).then((data) => { console.log(data[0]); });

module.exports = app;
