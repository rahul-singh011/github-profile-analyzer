
const express = require('express')
const profileRoutes = require('./routes/profile.routes')
const ApiError = require('./utils/ApiError')

const app = express()

app.use(express.json())

app.use('/api/profiles', profileRoutes )

app.use((err, req,res, next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null
        });
    }

    console.error(err);
    return res.status(500).json({
        message: 'Internal Server Error',
        data: null
    });
});

module.exports = app;