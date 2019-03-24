const mongoose = require('mongoose')
const bookModel = require('./bookModel')
const userModel = require('./userModel')
const categorySchema = new mongoose.Schema({

    name: {
        type: "string",
        required: true,
        unique: true
    }
})
//post hook for delete
categorySchema.post("findOneAndDelete", function (doc) {
    bookModel.deleteMany({ category_id: doc._id }, (err) => {
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

const categoryModel = mongoose.model('category', categorySchema)
module.exports = categoryModel