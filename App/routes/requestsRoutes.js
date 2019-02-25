const express = require('express');
const router = express.Router();
const  requestController = require('../controllers/requestController');
const globalServices = require("../services/globalService");

//This API is used to save the Process Information
router.post('/allocateRequest', globalServices.checkResourceSharingLimit,requestController.saveRequest);

//This API is used to get the Report of Allocation of Resource
router.post('/allocateAndReport', requestController.allocateAndReport)
module.exports = router;