const express = require('express');
const controller = require('./manageController');

const manageRouter = express.Router();




manageRouter.post('/addFolder', controller.addFolder);
manageRouter.post('/postPicture', controller.postPicture);
manageRouter.get('/getPictures', controller.getPictures);
manageRouter.post('/getFolders', controller.getFolders);
manageRouter.post('/addPicture', controller.addPicture);

module.exports = manageRouter;