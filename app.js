require('dotenv').config();
const express = require('express')
const rateLimit = require('express-rate-limit')
const logger = require('./utils/logger');

// Pending errorHandler
const app = express();
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

if(process.env.NODE_ENV != 'production'){
    app.use((req,res,next)=>{
        logger.debug(`${req.files} ${req.baseUrl}`);
        next();
    })
}



// Helmet Integration Pending

app.use(express.json());
app.use(express.urlencoded({extended : true, limit : '10kb'}));



const globalLimiter = rateLimit({
    windowMs : parseInt(process.env.RATE_LIMIT_WINDOW_MS,10) || 15 * 60 * 1000,
    max : parseInt(process.env.RATE_LIMIT_MAX,10)|| 100,
    standardHeaders:true,
    legacyHeaders : false,
    message : {status: 'fail', message : 'Too many requests. Please try again'}
})

//Pending errorHandler.

module.exports = app;