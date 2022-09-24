let chai = require ("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
let server = require ('../server');
let baseUrl = 'http://localhost:8001/api/v1';
let tokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwYmI5NDBmNTkyODJmNzhmODUxZTQxIiwiaWF0IjoxNjYxNzU5ODAxLCJleHAiOjE2NjE3NjM0MDF9.LvcSEinuTPFJBgRo2wcbBz33qV6Vln89cxZlEpSgsPU';
chai.should();
chai.use(chaiHttp);
describe('Favorite Book API',()=>{
describe('GET api/v1/favbooks/:email',()=>{
       it('It Should GET ALL the Favorite Books',(done)=>{
        let email = "dawandeepsinghs543@gmail.com"
        chai.request(baseUrl)
        .get('/favbooks/'+email)
        .set('Authorization',tokens)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array')
            response.body.length.should.not.be.eq(0)
        done()
        })
    })
    it('It Should NOT GET the Favorite Books WITHOUT TOKEN',(done)=>{
        let email = "dawandeepsinghs543@gmail.com"
        chai.request(baseUrl)
        .get('/favbooks/'+email)
        .set('Authorization','')
        .end((err,response)=>{
            response.should.have.status(401);
            response.text.should.be.eq("You are not authorized to access this endpoint")
        done()
        })
    })
    it('It Should NOT GET a Favbook With token if URL is not correct',(done)=>{
       let email = "dawandeepsinghs543@gmail.com"
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMwODZjMzhiNWUwNWZhOTFkNGY1OWM2IiwiaWF0IjoxNjYxNjAzMzIzLCJleHAiOjE2NjE2MDY5MjN9.awNZNHy2goDFoXhpPqQnw-eAQNoyby9iS7gSJHO8e3c";
        chai.request(baseUrl)
        .get('/favbook/'+email)
        .set('Authorization',token)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
 })
describe('POST api/v1/favbooks/addfavorite',()=>{
    it('It should POST a Favorite Book ',(done)=>{
        const FavBook = {
            coverImage:123456,
            title:"REACT JS",
            key:"/works/O124333",
            email:"dawandeepsinghs543@gmail.com"
        }
        chai.request(baseUrl)
        .post("/favbooks/addfavorite")
        .send(FavBook)
        .set('Authorization',tokens)
        .end((err,response)=>{
            response.should.have.status(201)
            response.body.should.be.a('object').to.have.property('status',201)
            done();
        })
    })
    it('It should NOT POST a Favorite Book Without token OR Wrong token',(done)=>{
      let token = "123";
        const FavBook = {
            coverImage:123456,
            title:"REACT JS",
            key:"/works/O124333",
            email:"dawandeepsinghs543@gmail.com"
        }
        chai.request(baseUrl)
        .post("/favbooks/addfavorite")
        .send(FavBook)
        .set('Authorization',token)
        .end((err,response)=>{
            response.should.have.status(401)
             response.text.should.be.eq('You are not authorized to access this endpoint')
            done();
        })
    })
    it('It should NOT POST a Favorite Book With token If Url is wrong',(done)=>{
      let token = "123";
        const FavBook = {
            coverImage:123456,
            title:"REACT JS",
            key:"/works/O124333",
            email:"dawandeepsinghs543@gmail.com"
        }
        chai.request(baseUrl)
        .post("/favbook/addfavorite")
        .send(FavBook)
        .set('Authorization',token)
        .end((err,response)=>{
            response.should.have.status(404)
            done();
        })
    })
     it('It should NOT POST a Favorite Book Without email fields',(done)=>{
        const FavBook = {
            coverImage:123456,
            title:"REACT JS",
            key:"/works/O124333",
        }
        chai.request(baseUrl)
        .post("/favbooks/addfavorite")
        .send(FavBook)
        .set('Authorization',tokens)
        .end((err,response)=>{
            response.should.have.status(404)
            response.body.should.be.a('object');
            response.body.should.have.property('errors');
            response.body.errors.should.have.property('email');
            response.body.errors.email.should.have.property('kind').eql('required');
        done();
        })
    })
})
describe('Delete api/v1/favbooks/:id',(err,data)=>{
    it('It should DELETE a Favorite Book',(done)=>{
       const id = "774afbe6-0b55-4551-98cd-75c0913a0037";
       chai.request(baseUrl)
       .delete("/favbooks/"+id)
       .set("Authorization",tokens)
       .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Book successfully deleted!');
        response.body.data.should.all.have.property('acknowledged').eql(true)
        response.body.data.should.all.have.property('deletedCount').eql(1)
        done()
       })
    })
   it('It should NOT DELETE a Favorite Book With Wrong Id',(done)=>{
    const id = "123"
    chai.request(baseUrl)
       .delete("/favbooks/"+id)
       .set("Authorization",tokens)
       .end((err,response)=>{
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Book is not found');
        done()
   })
})
  it('It should NOT DELETE a Favorite Book Without Token',(done)=>{
    const id = "68f3094e-10af-469b-a058-40485f970241"
    const token="123"
    chai.request(baseUrl)
       .delete("/favbooks/"+id)
       .set("Authorization",token)
       .end((err,response)=>{
        response.should.have.status(401);
        response.body.should.be.a('object');
         response.text.should.be.eq('You are not authorized to access this endpoint');
        done()
   })
})
 it('It should NOT DELETE a Favorite Book Without Correct URL',(done)=>{
    const id = "68f3094e-10af-469b-a058-40485f970241"
    chai.request(baseUrl)
       .delete("/favbooks/"+id)
       .set("Authorization",tokens)
       .end((err,response)=>{
        response.should.have.status(404);
        done()
   })
})
   
})
})