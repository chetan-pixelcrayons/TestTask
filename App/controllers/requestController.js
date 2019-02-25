const Request = require('../models/requestModel');
const constants = require("../../constants.json");
const globalServices = require("../services/globalService");
const waterfall = require('async-waterfall');
const _ = require("lodash");

// Saving the Request Information
exports.saveRequest = (req, res, next) => {
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

// Getting the Resource Allocation Information
exports.allocateAndReport = (req, res, next) => {
    Request.find({}).then(response =>{
        let  data = Object.assign([],response);
        console.log(response)
        let butlers =[];

        //Finding the unique Client IDs
        let  spreadClientIds = _.uniq(_.map(response, 'clientId'))
        for(let i=0;i<data.length;i++){
         let {newData , requests} =  assignButler(data);
         butlers.push(
             {
                 "requests" : requests
             });
             data = newData  ?  Object.assign([],newData) : [];
        }
        
        // Sending the Response
        res.json({
           butlers :butlers,
           spreadClientIds: spreadClientIds
        })
    })

}

// Assigning the Buttler to Each Process of 8 Hour
assignButler = function(data){
    let maxHours =8;
    let currentHours =0;
    let requests =[];
    let newData =  Object.assign([],data);
    for(let i=0;(currentHours <= maxHours) && i< newData.length ;i++){
     const item =  _.maxBy(data,"hours")
      if(item.hours <= maxHours){
      currentHours += item.hours;
      requests.push(item.requestId);
      }
      
      // Removing the Allocated Resource Request
      var index = data.findIndex(function(element){
        return element.hours===item.hours;
     })
     if(index !==-1){
        data.splice(index, 1)
     }
  }
  return {data,requests};
}

// Adding Dummy Data When MongoDB Intializes
exports.addDummyData = () => {
    const request = new Request({
        clientId: 1, 
        requestId: "xyz", 
        hours: 6,
      });
          request.save()
              .then(newRequest => {}) .catch(err =>{
                next(err);
              })
  
}


