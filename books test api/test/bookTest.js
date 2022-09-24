let chai = require("chai")
const chaiHttp = require("chai-http")
const {response} = require("express")
let server = require('../server')
chai.should()
chai.use(chaiHttp)
describe('Book API',()=>{
    describe('GET api/v1/books/:name',()=>{
        it('It Should GET a Books By Subject',(done)=>{
            const name = "love";
            chai.request('http://localhost:8000')
            .get("/api/v1/books/"+name)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('key')
                response.body.should.have.property('name').eql(name)
                response.body.should.have.property('works').be.a('array')
               done(); 
            })
        })
    })
    it('It Should NOT GET a book by Subject',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/books/"+name)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
    it('It Should NOT GET a book Without Correct URL',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/book/"+name)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
})
  //TEST FOR SEARCH BY AUTHOR
  describe('GET api/v1/books',()=>{
        it('It Should GET a Books By Author',(done)=>{
            const name = "jk rowling";
            chai.request('http://localhost:8000')
            .get("/api/v1/books?author="+name)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('docs')
                response.body.should.have.property('docs').be.a('array')
            done() 
            })
        })
        it('It Should NOT GET a book by Author',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/books?author="+name)
        .end((err,response)=>{
            response.should.have.status(404);
            // response.text.should.be.eq("The book with provided author does not exist")
        done();
        })
    })
      it('It Should NOT GET a book by Author',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/boo?author="+name)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
    })
//TEST FOR SEARCH BY TITLE
    describe('GET api/v1/books',()=>{
        it('It Should GET a Books By Title',(done)=>{
            const name = "Harry Potter";
            chai.request('http://localhost:8000')
            .get("/api/v1/book?title="+name)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('docs')
                response.body.should.have.property('docs').be.a('array')
            done() 
            })
        })
        it('It Should NOT GET a book by Title',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/book?title="+name)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
     it('It Should NOT GET a book by Title',(done)=>{
        const name = "sadasdasdad"
         chai.request('http://localhost:8000')
        .get("/api/v1/boo?title="+name)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
    })
