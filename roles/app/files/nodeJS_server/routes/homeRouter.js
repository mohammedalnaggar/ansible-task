const userModel = require('../models/userModel')
const authorModel = require('../models/authorModel')
// const bookModel = require('../models/bookModel')
const express = require('express')
const homeRouter = express.Router()
//list authors to user
homeRouter.get("/", (req, res) => {
    let user = req.headers.user_id
    console.log(user)
    let data_object = { books: null, authors: [] }
    userModel.findById(user)
        .populate("books.book_id")
        .select("books name")
        .then((data) => {
            console.log(data)
            if (data){
            data_object.books = data
            const arr_len = data.books.length
            let inc = 0
            if (data.books.length===0){res.send(data_object)} 
            data.books.forEach((book) => {
                authorModel.findById(book.book_id.author_id).select("first_name last_name")
                    .exec((err, author) => {
                        if (!err) { data_object.authors.push(author) }
                        inc++
                        if (inc == arr_len) { res.send(data_object) }

                    })
            })
        }
        })
});



module.exports = homeRouter