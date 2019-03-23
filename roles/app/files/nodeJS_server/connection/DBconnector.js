const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/goodReadsDB'

mongoose.connect(MONGO_URL, {
    autoReconnect: true,
    useNewUrlParser: true,
},(err) => {
    if(!err)
        console.log("Started connection with DB.")
})