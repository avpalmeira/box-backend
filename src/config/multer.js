const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const destFolder = path.resolve(__dirname, '..', '..', 'tmp');

module.exports = {
    dest: destFolder,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destFolder);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    })
}
