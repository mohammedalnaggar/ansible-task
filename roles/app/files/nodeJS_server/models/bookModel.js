const mongoose = require('mongoose')
const userModel = require('./userModel')
const bookSchema = new mongoose.Schema ({
    picture:{
        type: "string",
    },
    name:{
            type: "string",
            required: true
    },
    author_id: {
        type: "string", 
        required: true,
        ref: 'author'
    }, 
    category_id:{
        type: "string",
        required: true,
        ref: "category"
    },
    rating:{
        type:Number,
        min:0,
        max:5
    }
})
// post hook to change the overall rating of the book after new rating
bookSchema.post("findOne",function(doc) {
    userModel.find({})
    .then((data)=>{
        let sum_rating=0
        let count=0
        data.forEach((user)=>{
            user.books.forEach((book)=>{
                if (book.book_id==doc._id){
                    sum_rating+=book.user_rating
                    count+=1
                }
            })
        })
        doc.rating=sum_rating/count
        doc.save((err)=>{
            if (!err){console.log("done")}
        })
    })
})


// post hook to delete books from users lists after deleting it from website
bookSchema.post("findOneAndDelete",function(doc) {
    userModel.find({})
    .then((data)=>{
        data.forEach((user)=>{
            let arr_books=[]
            user.books.forEach((book)=>{
                if (book.book_id==doc._id){
                }
                else{
                    arr_books.push(book)
                }
            })
            user.books=arr_books
            user.save()
        })
    })
})


const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel