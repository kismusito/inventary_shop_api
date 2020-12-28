const multer = require("multer");
const path = require("path");
const fs = require('fs');

function ramdomName(_n, _ext , dest) {
    const posibleChars =
        "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let filename = "";
    for (let i = 0; i < _n; i++) {
        const random = Math.floor(Math.random() * (posibleChars.length - 1 - 0));
        filename += posibleChars[random];
    }

    if(fs.existsSync(__dirname + "/../../public/img/" + dest + "/" + filename + _ext)) {
        ramdomName(_n, _ext);
        return false;
    }

    return filename + _ext;
}

const upload = (dest) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "/../../public/img/" + dest));
        },
        filename: (req, file, cb) => {
            cb(null, ramdomName(40, path.extname(file.originalname) , dest));
        },
    });

    return multer({
        storage: storage,
    });
};

module.exports = upload;
