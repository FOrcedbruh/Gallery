const express = require('express');
const controller = require('./manageController');
const manageRouter = express.Router();
const upload = require('../middleware/upload');




manageRouter.post('/addFolder', controller.addFolder);
manageRouter.post('/postPicture', controller.postPicture);
manageRouter.get('/getPictures/:picName', controller.getPictures);
manageRouter.post('/getFolders', controller.getFolders);
manageRouter.post('/addPicture', upload.single('image'), controller.addPicture);

module.exports = manageRouter;