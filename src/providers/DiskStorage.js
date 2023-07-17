const fs = require("fs");
const path = require("path");
const uploadConfig = require("../config/uploadConfig");

class DiskStorage {
    async saveFile(file){

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
        try{
            await fs.promises.stat(filePath);
        }catch(err){
            return;
        }
        fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;