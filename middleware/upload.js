const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "pictures/");
    },
    filename: function (req, file, cb)  {
        cb(null, Date.now() + file.fieldname + file.originalname);
    }
});

const upload = multer({storage: storage});

module.exports = upload;