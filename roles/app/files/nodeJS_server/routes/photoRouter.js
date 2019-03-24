const fs=require("fs")
const express = require('express')
//////////multer//////////////
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())

    }
});

var upload = multer({   storage: storage,
                        limits: { fileSize: '50mb' }}).single('photo');
const photoRouter = express.Router()
photoRouter.post('/',express.static("/upload"),function(req,res){
    console.log("REQ",req.headers); //file is there in the body
    upload(req,res,function(err) {

        if(err) {
            console.log(err)
            return res.end(null);
        }
        console.log("File is uploaded")
        res.end(res.req.file.filename);
    });
});

photoRouter.get('/:image',function(req,res){
    let image=fs.readFileSync(process.cwd()+`/uploads/${req.params.image}`)
    let imageBuffer=new Buffer(image).toString('base64')
    res.send(imageBuffer)
})

module.exports = photoRouter