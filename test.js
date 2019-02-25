"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const requestSchema = new Schema({
    clientId: {type: Number, required: true},
    requestId: {type: String, required: true},
    hours: {type: Number, required: true}
});

const Request = mongoose.model('Request', requestSchema);
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {

    it('Allocate Resource', function(done) {
      var request = Request({
        clientId: 1,
        requestId: "xyz",
         hours: 6
      });
 
      request.save(done);
    });
    it('Do not Allocate Resource', function(done) {
        var request = Request({
          clientId: 1,
          requestId: "xyz",
           hours: 10
        });
   
        request.save(done);
      });
    it('get Resource information', function(done) {
      //Look up the 'Mike' object previously saved.
      Request.find({}, (err, data) => {
        if(err) {throw err;}
        if(data.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});