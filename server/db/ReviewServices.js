

const db = require('./database')

const updateReview = (
    where,
    update
) => {
    return db.review.findOneAndUpdate(
        where,
        update
    )
}

const deleteReview = (
    where
) => {
    return db.review.deleteOne(
        where
    )
}

const addReview = (
    query
) => {
    return db.review.create(
        query
    )
}
const getByIds = (_id,_id_game,_id_user) => {
    return db.review.findOne({_id:_id,_id_game:_id_game,_id_user:_id_user})
}
const getAll = () => {
    return db.review.find({})
}

const getById = (id) => {
    return db.review.findOne({ _id: id })
}

const search = (filter) => {
    console.log(filter)
    return db.review.find(filter)
}

const get = (ids) => {
    return db.review.find( {_id : {'$in': ids }})
}


module.exports = {
    addReview,
    getAll,
    search,
    get,
    getById,
    deleteReview,
    updateReview,
    getByIds

}