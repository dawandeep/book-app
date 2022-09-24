const repo = require('../repository/BookRepository')
const GetBooksBySubject=(req,res)=>{
    repo.GetBooksBySubject(req.params.name)
    .then((data) =>{
        res.status(data.status).send(data.books)
    }).catch((err) =>{
        res.status(404).send(err.response);
    })
}
const SearchByAuthor=(req,res)=>{
    repo.SearchByAuthor(req.query.author)
    .then(data =>{
       res.status(data.status).send(data.books)
    }).catch((err) =>{
        res.status(404).send(err.response);
    })
}
const SearchByTitle=(req,res)=>{
    repo.SearchByTitle(req.query.title)
    .then(data =>{
        console.log(data);
        res.status(data.status).send(data.books)
    }).catch((err) =>{
        res.status(404).send(err.response);
    })
}
const GetDetails=(req,res)=>{
     repo.GetDetails(req.params.key)
    .then((data) =>{
        res.status(200).send(data)
    }).catch((err) =>{
        res.status(404).send(err.response);
    })
}
module.exports = {SearchByAuthor,SearchByTitle,GetBooksBySubject,GetDetails};