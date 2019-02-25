const express = require('express');
const router = express.Router();
const  requestController = require('../controllers/requestController');
const globalServices = require("../services/globalService");

router.post('/allocateRequest', globalServices.checkResourceSharingLimit,requestController.allocateRequest);
router.get('/getResourceInformation',requestController.resourceInformation);

module.exports = router;