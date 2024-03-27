const express = require('express');
const controller = require('./manageController');

const manageRouter = express.Router();

manageRouter.post('/addFolder', controller.addFolder);
manageRouter.post('/addPicture', controller.addPicture);
manageRouter.post('/postPicture', controller.postPicture);
manageRouter.get('/getPictures', controller.getPictures);



module.exports = manageRouter;