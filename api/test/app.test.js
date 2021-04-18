//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('USERS:', () => {
    describe('ECONNREFUSED CHECK: ', () => {
        it('It must check for database connection', (done) => {
            chai.request("http://localhost:8080/api")
                .post('/users/signup')
                .end((err, res) => {

                    if(err){
                        console.error("ERROR:", err);
                        err.should.have.property("errno")
                       
                    }else{
                        console.log("Success: Connecting database")
                        describe('/POST Users Creation', () => {
                            it('It must register a user: 1. Must respond despite null request params 2. Response must be an object', (done) => {
                                chai.request("http://localhost:8080/api")
                                    .post('/users/signup')
                                    .end((err, res) => {
                                        console.log("Success: ",res.body)
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        // res.body.length.should.be.eql(0);
                                        done();
                                    });
                            });
                        });
                    }
                    done();
                    
                    // console.log("> API Response error: ",err)
                    // console.log("> API Response: ",res)
                    // res.should.not.have.status(200);
                    // // res.body.should.be.a('object');
                    // // res.body.length.should.be.eql(0);
                    
                });
        });
    });
    
    
});