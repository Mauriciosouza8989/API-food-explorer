require('express-async-errors')
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require("express");
const routes = require("./routes")
const cors = require("cors");
const uploadConfig = require("./config/uploadConfig");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes)
migrationsRun();

app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: console.log(error.message) //"internal server error",
        
    });
})

const port = 3333
app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
})