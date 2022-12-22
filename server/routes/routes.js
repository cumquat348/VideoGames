
const bcrypt = require('bcryptjs');
const db = require('../db/database')
const User = db.user
const ACCESS_TOKEN = require('crypto').randomBytes(64).toString('hex')
const REFRESH_TOKEN = require('crypto').randomBytes(64).toString('hex')
const mongoose = require("mongoose");
const jwtExpirySeconds = 60 * 15
const jwtExpiryRefreshSeconds = 60 * 60 * 24 * 1000
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const t = require('../db/UserService');
const g = require('../db/GameService');

const rv = require('../db/ReviewServices');
// const { ObjectID } = require('bson');
const { ObjectId } = require('mongodb');




const default_ = (req, res) => {
    res.json({ message: "Hello from server!" });
}

const getPriviledges = (req, res) => {

    const token = req.cookies?.token

    jwt.verify(token, ACCESS_TOKEN, (err, data) => {
        if (err) {
            res.json({ priviledges: "anonymous" });
        }
        else {

            User.findOne({ email: data.email }, (err, doc) => {
                if (err) {
                    res.json({ priviledges: "anonymous" });
                }
                else {
                    if (doc != null && doc.privileges == 1) {

                        res.json({ priviledges: "user" });
                    }
                    else if (doc != null && doc.privileges == 2) {
                        res.json({ priviledges: "admin" });
                    }
                    else {
                        res.json({ priviledges: "anonymous" });
                    }
                }
            })
        }
    })
}
const getFilters = (req, res) => {



    let response = {}

    db.game.find().distinct('genre', (err, doc) => {
        if (err) {
            res.json({ error: "Cannot find genres" });
        }
        else {
            // console.log(doc)
            response.genres = doc
            db.game.find().distinct('platform', (err, doc) => {
                if (err) {
                    res.json({ error: "Cannot find platfroms" });
                }
                else {
                    // console.log(doc)
                    response.platform = doc
                    res.json({ response: response });

                }
            })

        }
    })

}

const add =
    (req, res) => {
        res.json({ message: "Hello from add!" });
    }

function validateUserJson(object) {
    let query = {};
    Object.entries(object).forEach(([key, value]) => {
        if ('_id, blocked, privileges, blockade_expiration_date'.split(', ').includes(key) && value != null) {
            query[key] = value
        }
    })

    if (query['_id'] == null) {
        return null
    }
    else {
        return query
    }
}
function validateGameJson(object, type) {
    let query = {};
    Object.entries(object).forEach(([key, value]) => {
        if ('_id, blocked, privileges, blockade_expiration_date'.split(', ').includes(key) && value != null) {
            query[key] = value
        }
    })
    if (type == 'update') {
        delete query['_id']
        return query
    }
    else if (type == 'delete') {
        if (query['_id'] == null) {
            return null
        }
        return { '_id': query['_id'] }
    }
    else {
        delete query['_id']
        return query
    }

}

function validateReviewJson(object, type) {
    let query = {};
    Object.entries(object).forEach(([key, value]) => {
        if ('_id, _id_game, _id_user, content, rating'.split(', ').includes(key) && value != null) {
            query[key] = value
        }
    })
    if (type == 'update') {
        delete query['_id']
        delete query['_id_game']
        delete query['_id_user']
        return query
    }
    else if (type == 'delete') {
        // if (query['_id'] == null) {
        // return null
        // }
        // return { '_id': query['_id'] }
        return query
    }
    else {
        delete query['_id']
        return query
    }

}


const modifyUser =
    (req, res) => {

        let query = validateUserJson(req.body)
        let update = query
        delete update['_id']
        // console.log(req.body, query, update)
        if (update != null) {
            t.updateUser({ _id: req.body['_id'] }, update)
                .then((r) => {
                    return res.status(200).json({message:'ok'})
                })
                .catch((err) => {
                    return res.status(400).json({message:'error'})
                })
        }
        else {
            return res.status(400).json({message:'error'})
        }

    }

const modifyGame =
    (req, res) => {
        let update = validateGameJson(req.body, 'update')

        if (update != null) {
            t.updateGame({ _id: validateGameJson(req.body, 'delete') }, update)
                .then((r) => {
                    return res.sendStatus(200)
                })
                .catch((err) => {
                    return res.sendStatus(400)
                })
        }
        else {
            return res.sendStatus(400)
        }
    }
const addGame =
    (req, res) => {
        // console.log(req.body)
        
        // console.log(req.body)
        if (req.body != null) {
            db.game.create(req.body)
                .then((r) => {
                    console.log(r)
                    return res.status(200).json({message:'ok'})
                })
                .catch((err) => {
                    return res.status(400).json({message:'error'})
                })
        }
        else {
            return res.status(400).json({message:'error'})
        }
    }
const deleteGame =
    (req, res) => {
        let del = validateGameJson(req.body, 'delete')
        if (del != null) {
            db.game.deleteOne({ _id: del['_id'] })
                .then((r) => {
                    return res.status(200).json({message:'ok'})
                })
                .catch((err) => {
                    return res.status(400).json({message:'error'})
                })
        }
        else {
            return res.status(400).json({message:'error'})
        }
    }
const deleteUser =
    (req, res) => {
        let del = validateUserJson(req.body)
        // console.log(del)
        if (del != null) {
            t.deleteUser({ _id: del['_id'] })
                .then((r) => {
                    return res.status(200).json({message:"ok"})
                })
                .catch((err) => {
                    return res.status(400).json({message:"error"})
                })
        }
        else {
            return res.status(400).json({message:"error"})
        }
    }
const modifyReview =
    (req, res) => {
        let update = validateReviewJson(req.body, 'delete')
        // console.log(update)
        if (update != null) {
            // rv.updateGame({ _id: validateReviewJson(req.body, 'delete') }, update)
            
            

            // console.log(validateReviewJson(req.body, 'delete'), { $set: update })
            db.review.updateOne( { _id: new ObjectId(update._id) }, { $set: update }
                , (err, docs) => {
                    if (err) {
                        console.log(err)
                        res.status(400)
                    }
                    else {
                        // console.warn(docs)
                        res.json({ message: 'ok' })
                    }
                })

        }
        else {
            return res.sendStatus(400)
        }
    }
const addReview =
    (req, res) => {
        let insert = validateReviewJson(req.body, 'insert')
        insert._id_user = getUserId(req, res)
        if (insert != null) {
            rv.addReview(insert)
                .then((r) => {
                    //inserted
                    // console.log(r)
                    return db.game.updateOne({ _id: r._id_game }, { $push: { "review_id": r._id } })
                })
                .then((rr) => {
                    // console.log(rr)
                    return res.status(200).json({ message: "ok" })
                })
                .catch((err) => {
                    return res.sendStatus(400)
                })
        }
        else {
            return res.sendStatus(400)
        }
    }
const deleteReview =
    (req, res) => {

        let del = validateReviewJson(req.body, 'delete')
        // console.log(del)
        // console.log(req.body)
        if (del != null) {
            db.game.updateOne({ _id: req.body._id_game }, { $pull: { "review_id": del['_id'] } })
                .then((r) => { console.log(r); return rv.deleteReview({ _id: del['_id'] }) }
                )
                .then((rr) => {
                    // console.log(rr);
                    return res.status(200).json({ message: 'ok' })
                })
                .catch((err) => {
                    return res.sendStatus(400)
                })
        }
        else {
            return res.sendStatus(400)
        }
    }
// const permission=(req,res)=>{
//     var ret = getUserId(req, res)
//     rv.getByIds(req.body._id,req.body._id_game,ret).then(docs=>{




//     }).catch(err=>{
//         res.sendStatus(400)
//     })

// }

const library =
    (req, res) => {

        var ret = getUserId(req, res)
        let response = []
        t.getUserLibrary(ret).then(games => {
            for (let i = 0; i < games.length; ++i) {
                let obj = {}
                obj._id = games[i]._id;
                obj.title = games[i].title;
                response.push(obj)
            }

            res.json({ games: response })
        })
            .catch(err => { res.sendStatus(400) })


    }
const addLibrary =
    (req, res) => {

        var ret = getUserId(req, res)
        // console.log(ret, req.body._id_game)
        User.updateOne({ _id: ret }, { $addToSet: { library_ids: req.body._id_game } })

            // t.AddToUserLibrary(ret,req.body._id_game)
            .then(games => {

                res.json({ response: "ok" })
            })
            .catch(err => { res.sendStatus(400) })


    }

const deleteLibrary =
    (req, res) => {

        var ret = getUserId(req, res)
        // console.log(ret, req.body._id_game)
        User.updateOne({ _id: ret }, { $pull: { library_ids: req.body._id_game } })

            .then(games => {

                res.json({ response: "ok" })
            })
            .catch(err => { res.sendStatus(400) })


    }

    const allgames =
    (req, res) => {

        g.search({},{_id:-1},60,0).then((games,err) => {
                    if(err){
                        console.log(err)
                        res.status(400).json({message:'error'})
                    }
                    else{
                        res.json({games})
                    }
            
                    
                })
            }
            
    

const game =
    (req, res) => {

        g.getById(req.body._id).then(game => {
            console.warn(game, 133)
            rv.get(game.review_id).then(reviews => {
                {

                    let gamewithreviews = game.toObject();
                    gamewithreviews['review_id'] = reviews
                    const refreshToken = req.cookies.jwt;
                    jwt.verify(refreshToken, REFRESH_TOKEN,
                        (err, decoded) => {
                            if (err) {
                                res.json(gamewithreviews)
                            }
                            else {
                                let objIndex = reviews.findIndex((obj => obj._id_user == decoded.user_id));
                                // console.log(objIndex)
                                if (objIndex != -1) {
                                    let rev = JSON.parse(JSON.stringify(reviews));
                                    rev[objIndex].flag = "owner"
                                    // console.log(rev,1)
                                    // console.warn(reviews[objIndex]._id_user)
                                    gamewithreviews['review_id'] = rev
                                    // console.log(gamewithreviews,2)
                                    res.json(gamewithreviews)
                                }
                                else {
                                    gamewithreviews['review_id'] = reviews
                                    res.json(gamewithreviews)
                                }
                            }
                        })
                    // res.json(gamewithreviews)
                }
            })

        })
            .catch(err => { res.sendStatus(400) })


    }
function validateFilterJsonReview(object) {
    let query = {};
    Object.entries(object).forEach(([key, value]) => {
        if ('_id, _id_games, _id_user, content, rating'.split(', ').includes(key) && value != null) {
            query[key] = value
        }
        switch (key) {
            case '_id':
            case '_id_games':
            case '_id_user':
                query[key] = new ObjectId(value)
                break;
            case 'content':
            case 'rating':
                query[key] = value
                break;
            default:
                break;
        }


    })
    return query

}
const getReview =
    (req, res) => {
        let filters = validateFilterJsonReview(req.body)
        // console.log(filters)
        rv.search(filters).then(reviews => {
            {
                // console.log(reviews)
                res.json(reviews)
            }
        })
            .catch(err => { res.sendStatus(400) })
    }

function validateFilterJson(object) {
    let query = {};
    Object.entries(object).forEach(([key, value]) => {
        if ('title, genre, series, platform, release_date, added_date, sort'.split(', ').includes(key) && value != null) {
            query[key] = value
        }
        switch (key) {
            case 'title':
                query[key] = new RegExp('.*' + value + '.*')
                break;
            case 'genre':
                query[key] = { '$all': value }
                break;
            case 'series':
                query[key] = value
                break;
            case 'platform':
                query[key] = value
                break;
            case 'release_date':
                if (value[0] != '' && value[1] != '') {
                    query[key] = { '$gte': new Date(value[0]), '$lte': new Date(value[1]) }
                }
                else if (value[1] != '') {
                    query[key] = { '$lte': new Date(value[1]) }

                }
                else {
                    query[key] = { '$gte': new Date(value[0]) }

                }
                break;
            case 'added_date':
                if (value[0] != '' && value[1] != '') {
                    query[key] = { '$gte': new Date(value[0]), '$lte': new Date(value[1]) }
                }
                else if (value[1] != '') {
                    query[key] = { '$lte': new Date(value[1]) }
                }
                else {
                    query[key] = { '$gte': new Date(value[0]) }
                }
                break;
            case 'sort':
            case 'page':
                query[key] = value
                break;
            default:
                break;
        }


    })
    return query

}

const search =
    (req, res) => {
        // console.log(req.body)
        let filter = validateFilterJson(req.body)
        if (filter != null) {
            let page = 0;
            if ('page' in filter) {
                page = filter['page']
                delete filter['page']
            }
            let sorting = {}
            if ('sort' in filter) {
                sorting = filter['sort']
                delete filter['sort']
            }
            // console.log(filter)
            g.search(filter, sorting, 12, page)
                .then((r) => {
                    // console.log(r)
                    // let response = r
                    // response.forEach(function(part, index, theArray) {
                    //     response[index].date_created = new Date(parseInt(response[index]['_id'].substring(0, 8), 16) * 1000);
                    //   })

                    //   for(var i =0;i<response.length;++i){
                    //       response[i].release_date =  new Date(parseInt(response[i]._id.toString().substring(0, 8), 16) * 1000);
                    //       console.warn( new Date(parseInt(response[i]._id.toString().substring(0, 8), 16) * 1000))
                    //   }
                    //   console.log(response)
                    return res.json(r);
                })
                .catch((err) => {
                    console.log(err)
                    return res.sendStatus(400)
                })
        }
        else {
            return res.sendStatus(400)
        }

    }

    const myReviews =
    (req, res) => {
        
        let filter = validateFilterJson(req.body)
        if (filter != null) {
            let page = 0;
            if ('page' in filter) {
                page = filter['page']
                delete filter['page']
            }
            let sorting = {}
            if ('sort' in filter) {
                sorting = filter['sort']
                delete filter['sort']
            }
            
            db.review.distinct("_id" , {_id_user : getUserId(req,res)},(err,docs)=>{
                if(err)
                {
                    res.status(400).json({message:'error'})
                }
                else{

                    g.search({...filter, review_id :{ $in : docs }}, sorting, 12, page)
                    .then((r) => {
                        // console.log(r)
                        // let response = r
                        // response.forEach(function(part, index, theArray) {
                        //     response[index].date_created = new Date(parseInt(response[index]['_id'].substring(0, 8), 16) * 1000);
                        //   })
    
                        //   for(var i =0;i<response.length;++i){
                        //       response[i].release_date =  new Date(parseInt(response[i]._id.toString().substring(0, 8), 16) * 1000);
                        //       console.warn( new Date(parseInt(response[i]._id.toString().substring(0, 8), 16) * 1000))
                        //   }
                        //   console.log(response)
                        return res.json(r);
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(400).json({message:'error'})
                    })

                }
            })

            
        }
        else {
            return res.sendStatus(400)
        }

    }



const signout =
    (req, res) => {
        res.clearCookie('picture');
        res.clearCookie('token');
        res.clearCookie('jwt');
        res.sendStatus(200).end();
    }
const signup =
    (req, res) => {
        try {
            const { nick, email, password, picture } = req.body;

            if (!(email && password && nick)) {
                res.status(400).send("email, password, nick - required");
            }
            else {

                var id;
                t.getUserByEmail(email.toLowerCase())
                    .then((doc) => { id = doc; return bcrypt.hash(password, 10) })
                    .then(hash => {
                        // if (id != null) throw new Error("");
                        return t.insertUser(nick, email.toLowerCase(), `${hash}`, false, picture || 'avatar', 1, Date.now(), [])
                    }
                    ).then(data => {
                        const token = generateToken(data._id, email.toLowerCase());
                        res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                        res.cookie("picture", data.picture, { maxAge: 24 * 60 * 60 * 1000 })
                        return res.sendStatus(201);
                    }).catch((err) => {
                        console.log(err)
                        return res.status(400).end();
                    })

            }

        } catch (err) {
            console.log(err);
            return res.status(400).send("ERROR");
        }
    }

const signin =
    (req, res) => {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.status(400).send("All input is required");
            }
            var id;
            var picture;
            t.getUserByEmail(email.toLowerCase())
                .then((doc) => { id = doc._id; picture = doc.picture;console.error(doc.password); if(doc.blocked && Date.now() < doc.blockade_expiration_date) throw Error("Blocked"); return bcrypt.compare(password, doc.password) })
                .then(( result) => {


                    if(!result){
                        throw new Error("Invalid Credentials")
                    }

                    const token = generateToken(id, email.toLowerCase());
                    res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                    const refreshToken = generateRefreshToken(id)
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        sameSite: 'Strict',
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    res.cookie("picture", picture, { maxAge: 24 * 60 * 60 * 1000 })
                    // console.log(picture)
                    return res.status(200).send("Loggedin");
                })
                .catch((err) => {
                    console.error(err)
                    return res.status(400).send("Invalid Credentials");
                })

        } catch (err) {
            console.log(err);
            return res.status(400).end();
        }
    }
/* helpers */
function getPriviledgesNumber(result, token) {




}

function verifyTokenAndPriviledges(token, req, res, next) {
    jwt.verify(token, ACCESS_TOKEN, (err, data) => {

        if (err) {
            // console.log(err)
            return res.sendStatus(403)
        }
        else {
            //   console.log(data)
            User.findOne({ email: data.email }, (err, doc) => {

                if (err) {
                    return res.status(400).send("Invalid Credentials");
                }

                // console.log(doc)
                // console.log(req.path)
                if (doc != null && doc.privileges == 1 && ['/users','/addGame', '/modifyGame', '/deleteGame', '/modifyUser', '/deleteUser'].includes(req.path)) {

                    return res.sendStatus(403)
                }
                // else if(doc != null && doc.privileges == 1 && [ '/modifyReview', '/deleteReview'].includes(req.path)){

                // }
                else if (doc != null) {
                    next()
                }
                else {
                    return res.sendStatus(403);
                }
            });
        }
    })
}
function getUserId(req, res) {
    if (req.cookies.jwt) {
        const refreshToken = req.cookies.jwt;
        var id = null
        jwt.verify(refreshToken, REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                res.sendStatus(400)
            }
            id = decoded.user_id

        })
        return id;
    }
    else
        res.sendStatus(400);
}
function getUsers(req,res){
    User.find({}, (err, docs) => {
        if (err) {
            res.sendStatus(400);
        }
        else {

            let responseArr = []
            docs.forEach(e =>{
                let response = {}
                response._id = e._id
                response.nick = e.nick
                response.email = e.email
                response.privileges= e.privileges
                response.blocked = e.blocked
                response.blockade_expiration_date = e.blockade_expiration_date
                responseArr.push(response)
            })
            res.json({ docs: responseArr })   
            
        }
    })
}
function verify(req, res, next) {
    const token = req.cookies?.token
    if (token == null && req.cookies.jwt) {
        const refreshToken = req.cookies.jwt;
        jwt.verify(refreshToken, REFRESH_TOKEN,
            (err, decoded) => {
                if (err) {
                    console.log(err)
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    User.findOne({ _id: decoded.user_id }, (err, doc) => {
                        if (err) {
                            return res.status(400).send("Connection expired!");
                        }
                        else {
                            const token = generateToken(doc._id, doc.email);
                            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                            console.log('new token')

                            verifyTokenAndPriviledges(token, req, res, next)

                        }
                    });
                }
            })
    } else if (token == null) {
        return res.sendStatus(401)
        // return res.status(406).json({ message: 'Unauthorized' });
    } else {
        verifyTokenAndPriviledges(token, req, res, next)
    }

}


function generateToken(id, email) {
    return jwt.sign(
        { user_id: id, email: email },
        ACCESS_TOKEN,
        {
            expiresIn: jwtExpirySeconds
        }
    );
}
function generateRefreshToken(id) {
    return jwt.sign(
        { user_id: id },
        REFRESH_TOKEN,
        {
            expiresIn: jwtExpiryRefreshSeconds
        }
    );
}

module.exports = {
    modifyUser: modifyUser,
    modifyGame: modifyGame,
    addGame: addGame,
    deleteGame: deleteGame,
    deleteUser: deleteUser,
    library: library,
    addLibrary: addLibrary,
    deleteLibrary: deleteLibrary,
    search: search,
    signout: signout,
    signin: signin,
    signup: signup,
    verify: verify,
    game: game,
    allgames:allgames,
    getUsers:getUsers,
    
    myReviews:myReviews,

    getReview: getReview,
    addReview: addReview,
    modifyReview: modifyReview,
    deleteReview: deleteReview,

    getPriviledges: getPriviledges,
    getFilters: getFilters
}