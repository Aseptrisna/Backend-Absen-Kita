const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
const Logger = require('../utils/logger')
const mongoURL =process.env.MONGO_DEV;


mongoose.connect(mongoURL,
    err => {
        if(err) throw err;
        Logger.info('Connection Database Successful')
});