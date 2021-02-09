/* eslint no-console:0, no-param-reassign:0 */
const app = require('express')();
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

const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';

logger.initializeGlobalHandlers();
const { authFactory } = require('./middleware/auth-handler');

const corsOptions = {
    origin: 'http://localhost:3001',
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
    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`);
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
