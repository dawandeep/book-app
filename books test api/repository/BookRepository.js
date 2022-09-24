const { default: axios } = require('axios')
const GetBooksBySubject=(subject)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`http://openlibrary.org/subjects/${subject}.json?limit=10`,)
        .then((res)=>{
            let book =res.data.works
            if(book.length === 0){
             reject({status:404,message:"The book with provided subject does not exist"})
            }
            else{
            let books = res.data
            resolve({status:200,books})
            }
        })
        .catch((err)=>{
            console.log(err);
            reject({status:err.status,message:err.response})
        })
    })
}
const SearchByAuthor = (name)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`http://openlibrary.org/search.json?author=${name}`)
        .then((res)=>{
            let book =res.data.docs
            if(book.length === 0){
             reject({status:404,message:"The book with provided author does not exist"})
            }
            else{
            let books = res.data
            resolve({status:200,books})
            }
        })
        .catch((err)=>{
            reject({status:err.status,message:err.message})
        })
    })
}
const SearchByTitle = (name)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`http://openlibrary.org/search.json?title=${name}`)
        .then((res)=>{
            let book =res.data.docs
            if(book.length === 0){
             reject({status:404,message:"The book with provided title does not exist"})
            }
            else{
            let books = res.data
            resolve({status:200,books})
            }
        })
        .catch((err)=>{
            reject({status:err.status,message:err.message})
        })
    })
}
const GetDetails=(key)=>{
     return new Promise((resolve,reject)=>{
        console.log(key);
        axios.get(`https://openlibrary.org/works/${key}`)
        .then((res)=>{
            resolve(res.data)
        })
        .catch((err)=>{
            console.log(err);
            reject({status:404,message:err.message})
        })
    })
}
module.exports = {SearchByAuthor,SearchByTitle,GetBooksBySubject,GetDetails}