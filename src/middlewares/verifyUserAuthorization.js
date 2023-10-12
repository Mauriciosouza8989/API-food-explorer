const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify){
    return(req, res, next)=>{
        const {role} = req.user;
        if(roleToVerify != role){
            throw new AppError("Unauthorized", 401);
        }
        next();
    }
}

module.exports = verifyUserAuthorization;