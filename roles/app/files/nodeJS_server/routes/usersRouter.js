const userModel = require('../models/userModel')
const authorModel = require('../models/authorModel')
const bookModel = require('../models/bookModel')
const jwt = require('jsonwebtoken')
const send_mail=require("../connection/mail")
const express = require('express')
const usersRouter = express.Router()
ObjectId = require('mongodb').ObjectID;

// signing up new user
usersRouter.post('/', (req, res) => {
    new_req = JSON.parse(Object.keys(req.body)[0])
    let subject="Welcome to nahmReads"
    let message="<h3>Thank you for joining nahmReads</h3>"
    // check if the email already exists
    userModel.find({
        email: new_req.email
    }, (err, data) => {
        if (!err) {
            if (!data[0]) {
                // register newuser
                // create a token
                const data = {
                    check: true
                }
                let token = {
                    token: jwt.sign(data, "naggarsecret", {
                        expiresIn: 1 //minutes
                    })
                }
                // attach token on the user object body
                // new_user.tokens = [token];
                let new_user = {
                    name: {
                        first_name: new_req.first_name,
                        last_name: new_req.last_name
                    },
                    email: new_req.email,
                    password: new_req.password,
                    tokens: [
                        token
                    ],
                    books:[]
                }
                userModel.create(new_user, (err, data) => {
                    if (err) {
                        // as long as all fields will not be null from client side >> check mail only not
                        // existing
                        res.send(null)

                    } else {
                        res.send({
                            user_id:data._id,
                            message: "auth",
                            token
                        })
                        send_mail(new_req.email,subject,message)
                    }
                })
            } else {
                res.send(null)
            }
        } else {
            res.send(null);
        }
    })
})

usersRouter.post('/login', (req, res, next) => {

    new_req = JSON.parse(Object.keys(req.body)[0])

    userModel.find({
        email: new_req.email,
        password: new_req.password
    }, (err, data) => {
        if (!err) {
            if (data[0]) {
                // create a new token for logged in user
                let user_id=data[0]._id
                const data2 = {
                    check: true
                }
                let token = {
                    token: jwt.sign(data2, "naggarsecret", {
                        expiresIn: 1 //minutes
                    })
                }
                let new_tokens = []
                data[0].tokens.forEach(function (e) {
                    new_tokens.push(e);
                })

                new_tokens.push(token)

                userModel.updateOne({
                    email: new_req.email
                }, {
                    $set: {
                        tokens: new_tokens
                    }
                }, (err, data) => {
                    if (!err) {
                        // send the new token to the client
                        console.log("token value" + token.token)
                        res.send({
                            user_id,
                            message: "authinticated",
                            token
                        });
                    } else {
                        res.send(null)
                    }
                })

            } else {
                res.send(null)
            }
        } else {
            res.send(null)
        }
    })
})

//information and data for Author page
usersRouter.get("/:idU/:idA", (req, res) => {
    const data_object = {
        author: null,
        authorbooks: null
    }
    authorModel.findOne({
            _id: req.params.idA
        })
        .then((data) =>
         {
            data_object.author = data
        })
    const authorbooks = null
    bookModel.find({
        author_id: req.params.idA
    }, function (err, data)
     {
        if (!err)
            authorbooks = data
    }
    )
    const userbooks = null
    userModel.findOne(
        {
        _id: req.params.idU
    }, function (err, data) 
    {
        if (!err)
            userbooks = data.books
    }
    )

    authorbooks.forEach(function (authorbook) {
        userbooks.forEach(function (userbook) {
            if (authorbook._id === userbook.book_id) {
                authorbook.status = userbook.status
                authorbook.user_rating = userbook.user_rating
            }
            else
            {
                authorbook.status = null
                authorbook.user_rating = null

            }

        }
        )

    }
    ).then(() => 
    {
        data_object.authorbooks = authorbooks
        res.send(data_object)
    }
    )
}
)

//list authors to user
usersRouter.get("/authors", (req, res) => {
    authorModel.find({}, (err, data) => {
        if (!err)
            res.send(data);
    });
});

function md5(d) { return rstr2hex(binl2rstr(binl_md5(rstr2binl(d), 8 * d.length))) } function rstr2hex(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function rstr2binl(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function binl2rstr(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function binl_md5(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

//send new password
usersRouter.post("/forget", (req, res) => {
    new_req = JSON.parse(Object.keys(req.body)[0])
    let newPass=Math.floor(Math.random() * 10000000).toString()
    let subject="password reset"
    let message=`<h3>your new password is</h3><div>${newPass}</div>`
    userModel.findOneAndUpdate({email:new_req.email},{password:md5(newPass)},(err,data)=>{
        if (!err){
            if(data){
            send_mail(new_req.email,subject,message)
            res.send("done")}
            else{
                res.send(null)
            }
        }
        else{
            res.send(null)
        }
    })
    
});

module.exports = usersRouter