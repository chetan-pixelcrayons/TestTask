const Request = require('../models/requestModel');
const constants = require("../../constants.json");
const globalServices = require("../services/globalService");
const waterfall = require('async-waterfall');
const _ = require("lodash");
exports.allocateRequest = (req, res, next) => {
    const request = new Request({
        clientId: req.body.clientId, 
        requestId: req.body.requestId, 
        hours: req.body.hours,
      });
          request.save()
              .then(newRequest => {
                res.status(201).json({
                  success: true,
                  message: "Resource Allocated Successfully"
                });
              }) .catch(err =>{
                next(err);
              })
  
}
exports.resourceInformation =  (req, res, next) => {
    Request.distinct("clientId")
    .then(response => {
        let clientIds = response;
        let butlers =[];
        waterfall([
            function(callback){
                for(let i=0; i<clientIds.length;i++){
                    let requests = [];
                    Request.find({clientId : clientIds[i]}).then(data =>{
                        for(let j=0; j<data.length;j++){
                           requests.push(data[j].requestId);
                        }
                        butlers.push(
                            {
                                "requests" :requests
                            }
                        )
                        console.log("butlers", butlers)
                    });
                }
              callback(null,butlers);
            },
            function(butlers, callback){
                res.status(200).json({
                    success : true,
                    message : "success",
                    butlers : butlers,
                    spreadClientIds : clientIds
                })
            }
          ], function (err, result) {
            // result now equals 'done'
          });
    });
  
}

exports.allocateAndReport = (req, res, next) => {
 let  data = req.body;
 let  newData = req.body;
 let butlers =[];
 let  spreadClientIds = _.uniq(_.map(newData, 'clientId'))
 for(let i=0;i<data.length;i++){
  let {newData , requests} =  assignButler(data);
  butlers.push(
      {
          "requests" : requests
      });
      data = newData  ? newData : [];
 }
 res.json({
    butlers :butlers,
    spreadClientIds: spreadClientIds
 })
}

assignButler = function(data){
    let maxHours =8;
    let currentHours =0;
    let requests =[];
    for(let i=0;(currentHours <= maxHours) && i< data.length ;i++){
     const item =  _.maxBy(data,"hours")
      if(item.hours <= maxHours){
      currentHours += item.hours;
      requests.push(item.requestId);
      }
      var index = data.findIndex(function(element){
        return element.hours===item.hours;
     })
     if(index !==-1){
        data.splice(index, 1)
     }
  }
  return {data,requests};
}


