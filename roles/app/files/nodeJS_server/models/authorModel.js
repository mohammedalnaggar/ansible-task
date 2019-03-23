const mongoose = require('mongoose')
const bookModel = require('./bookModel')
const userModel = require('./userModel')
const authorSchema = new mongoose.Schema ({
    picture:{
        type: "string",
    },
    first_name: {
        type: "string",
        required: true
    },
    last_name: {
        type: "string", 
        required: true
    },
    birth_date:{
        type: "date",
        required:true
    }
})
//post hook for delete
authorSchema.post("findOneAndDelete",function(doc) {
    bookModel.deleteMany({ author_id: doc._id}, (err) => {
        if (!err) {
            console.log("books of this category have been successfuly deleted")


            userModel.find({}, (err, data) => {
                data.forEach((user) => {
                    let arr_books = []
                    let inc = 0
                    let len = user.books.length
                    user.books.forEach((book) => {
                        bookModel.find({ _id: book.book_id }, (err, data) => {
                            if (data.length != 0) {
                                arr_books.push(book)
                                user.books = arr_books
                            }
                            inc++
                            if (inc == len) {
                                user.save()
                            }
                        })
                    })
                })
            })
        }
    })

})

const authorModel = mongoose.model('author', authorSchema)
module.exports = authorModel