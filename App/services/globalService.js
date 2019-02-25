var fs                = require('fs');
var constants = require("../../constants.json");

/**
* This function is use to validate Hour Limit
*/
module.exports.checkResourceSharingLimit = function(req, res, next) {
  const  data = [req.body];
  for(let i=0;i< data.length;i++){
      if(data[i].hours > constants.max_hours){
       return res.status(409).json({
           status : false,
           message : "Invalid Hours"
       })
      } else {
          return next();
      }
  }
};

