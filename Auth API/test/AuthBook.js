let chai = require ("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
let server = require ('../server');
const mongoose = require('mongoose');
const Users = require('../models/UserModel');
mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/AuthBooked';
mongoose.connect(MONGODB_URI);
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs before each test
    before((done) => {
        mongoose.connection.collections.Users.drop(() => {
        done();
       });
});
let baseUrl = 'http://localhost:7000/api/v1/auth';
chai.should();
chai.use(chaiHttp);
describe("AUTH API",()=>{
    describe("POST /api/v1/auth",()=>{
        it("It Should POST a User",(done)=>{
            const user = {
                firstname:"Tarun",
                lastname:"deep",
                city:"New Delhi",
                phone:7654765423,
                email:"tarun@gmail.com",
                password:"123456",
                image:"hasasassdsd"
            }
            chai.request(baseUrl)
            .post("/register")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(200)
               response.body.should.be.a('object').to.have.property('status',200)
               done()
            })
        })
        it("It Should NOT POST a User WITH SAME email",(done)=>{
            const user = {
                firstname:"Tarun",
                lastname:"deep",
                city:"New Delhi",
                phone:7654765423,
                email:"tarun@gmail.com",
                password:"123456",
                image:"hasasassdsd"
            }
            chai.request(baseUrl)
            .post("/register")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(200)
               response.body.should.be.a('object').to.have.property('status',409)
               response.body.should.have.property('message').eql('User with specified email already exists');
               done()
            })
        })
        it("It Should NOT POST a User With Wrong URL",(done)=>{
            const user = {
                firstname:"Tarun",
                lastname:"deep",
                city:"New Delhi",
                phone:7654765423,
                email:"tarun@gmail.com",
                password:"123456",
                image:"hasasassdsd"
            }
            chai.request(baseUrl)
            .post("/registe")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(404)
               done()
            })
        })
    })
    describe('LOGIN api/v1/auth/login',(err,data)=>{
       it("It Should LOGIN a User",(done)=>{
            const user = {
                email:"tarun@gmail.com",
                password:"123456",
            }
            chai.request(baseUrl)
            .post("/LOGIN")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(200)
               response.body.should.be.a('object').to.have.property('status',200)
               done()
            })
        }) 
        it("It Should NOT LOGIN WITHOUT CORRECT PASSWORD",(done)=>{
            const user = {
                email:"tarun@gmail.com",
                password:"12345",
            }
            chai.request(baseUrl)
            .post("/LOGIN")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(401)
               response.text.should.be.eq("Unauthorized")
               done()
            })
        })
        it("It Should NOT LOGIN WITHOUT CORRECT EMAIL",(done)=>{
            const user = {
                email:"tarun@gmil.com",
                password:"123456",
            }
            chai.request(baseUrl)
            .post("/LOGIN")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(401)
               response.text.should.be.eq("Unauthorized")
               done()
            })
        })
        it("It Should NOT LOGIN WITH WRONG URL",(done)=>{
            const user = {
                email:"tarun@gmil.com",
                password:"123456",
            }
            chai.request(baseUrl)
            .post("/LOGN")
            .send(user)
            .end((err,response)=>{
               response.should.have.status(404)
               done()
            })
        })    
    })
    describe('GET api/v1/auth/user/:email',(err,data)=>{
        it("It Should NOT GET a User",(done)=>{
            chai.request(baseUrl)
            .get("/user")
            .end((err,response)=>{
               response.should.have.status(404)
               response.body.should.be.a('object')
               done()
            })
        })
        it("It Should GET a User",(done)=>{
        const user = "tarun@gmail.com"
            chai.request(baseUrl)
            .get("/user/"+ user)
            .end((err,response)=>{
               response.should.have.status(200)
               response.body.should.be.a('object')
               done()
            })
        })
        it("It Should NOT GET a User Without Correct URL",(done)=>{
        const user = "tarun@gmail.com"
            chai.request(baseUrl)
            .get("/usr/"+ user)
            .end((err,response)=>{
               response.should.have.status(404)
               response.body.should.be.a('object')
               done()
            })
        })
    })
})
