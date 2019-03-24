const userModel = require('../models/userModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const express = require('express')
const authorsRouter = express.Router()
//list authors to user
authorsRouter.get("/", (req, res) => {
    authorModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});


//information and data for Author page
authorsRouter.get("/:idU/:idA", (req, res) => {
    let data_object = {
        author: null,
        authorbooks: null
    }
    authorModel.findOne({
        _id: req.params.idA
    }).then((data) => {
        data_object.author = data
    })
    let authorbooks = null
    bookModel.find({
        author_id: req.params.idA
    }, function (err, data) {
        if (!err)
            authorbooks = data
    })
    let userbooks = null
    userModel.findOne({
        _id: req.params.idU
    }).then((data) => {
        userbooks = data.books
        let arr = []
        console.log("author books")
        console.log(authorbooks)
        console.log("---------")
        let emptyFlag = 0
        authorbooks.forEach(function (authorbook) {
            userbooks.forEach(function (userbook) {
                emptyFlag =1
                let book = {
                    book: null,
                    status: null,
                    user_rating: null
                }
                 
                if (authorbook._id == userbook.book_id) {
                    console.log("enter if")
                    book.book = authorbook
                    book.status = userbook.status
                    book.user_rating = userbook.user_rating
                    // arr.push(book)
                } else {
                    console.log("enter else")
                    book.book = authorbook
                    book.status = null
                    book.user_rating = null
                }
                let flag = 0
                arr.forEach(function(bookCheck){
                 if(bookCheck.book._id ==  authorbook._id){
                     flag =1
                 }
                })
                if(flag ==0){
                    arr.push(book)
                }

            })
        })
        
        if(emptyFlag == 0){
            authorbooks.forEach(function(authorbook){
                let book = {
                    book: null,
                    status: null,
                    user_rating: null
                }
                book.book = authorbook
                    book.status = null
                    book.user_rating = null
                    arr.push(book)

            })
        }
        
        data_object.authorbooks = arr
        console.log(data_object)
        res.send(data_object)
    })
})

module.exports = authorsRouter