const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.include({
                    initNum: 10,
                    initUnit: 'l',
                    returnNum: 2.64172,
                    returnUnit: 'gal',
                });
                done();
            });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.include({ error: 'invalid unit' });
                done();
            });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kg' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.include({ error: 'invalid number' });
                done();
            });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilomegagram' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.include({ error: 'invalid number and unit' });
                done();
            });
    });

    test('Convert with no number such as kg: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'kg' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.include({
                    initNum: 1,
                    initUnit: 'kg',
                    returnNum: 2.20462,
                    returnUnit: 'lbs',
                });
                done();
            });
    });
});
