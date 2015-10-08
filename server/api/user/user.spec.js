'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');


describe('GET /api/users', function() {
  it('login', loginUser());
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

function loginUser() {
    return function(done) {
        request(app)
            .post('/local')
            .send({ username: 'a@a.com', password: 'admin' })
            .expect(302)
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
}