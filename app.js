const express = require("express");
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

var whiteList = [];

var regexList = [];

var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (origin === undefined) {
            callback(null, true)
        } else if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else if (regexList.some(regex => regex.test(origin))) {
            console.log('CORS2', origin);
            callback(null, true)
        } else {
            console.error('CORS', origin)
            callback(new Error('Not allowed by CORS'))
        }
    },
    exposedHeaders: ['Content-Disposition']
};

// allow cors requests from any origin and with credentials
app.use(cors(corsOptions));

// main route
app.get("/", (req, res) => {
    res.send("Welcome to your App!");
});

// api routes
app.use("/accounts", require("./controllers/account")(router));
app.use("/users", require("./controllers/user")(router));

// global error handler
app.use(errorHandler);

module.exports = app;
