const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const UPLOADS_FOLDER = path.resolve(__dirname, "..", "..", "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination:  UPLOADS_FOLDER,
        filename(req, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
};
module.exports = {
    UPLOADS_FOLDER,
    MULTER,
}