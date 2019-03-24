const express = require('express')
const categoryModel = require('../models/categoryModel')
const bookModel = require('../models/bookModel')
const categoriesRouter = express.Router()



//list categories
categoriesRouter.get("/", (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});

categoriesRouter.get('/:id', function (req, res) {
    // data_object = { "book": null, "author": null }
    // books_authors4category = []
     bookModel.find({ category_id: req.params.id }, function (err, books4category) {
    
    }).populate('author_id').populate('category_id').exec(function (err, author_i) {
        console.log(author_i)
        // console.log(author_i[0].author_id.first_name)
        res.send(author_i)  
        
    });
   
})


module.exports = categoriesRouter