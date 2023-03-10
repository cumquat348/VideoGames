

const db = require('./database')

const updateGame = (
    where,
    update
) => {
    return db.game.findOneAndUpdate(
        where,
        update
    )
}

const deleteGame = (
    where
) => {
    return db.game.deleteOne(
        where
    )
}

const addGame = (
    query
) => {
    return db.game.create(
        query
    )
}

const getAll = () => {
    return db.game.find({})
}

const search = (filters,sorting,perPage, page) => {
    // console.log(filters)
    
    return db.game.find(filters).limit(perPage).skip(perPage * page).sort(sorting)
}

const getById = (id) => {
    return db.game.findOne({ _id: id })
}


module.exports = {
    addGame,
    getAll,
    search,
    getById,
    deleteGame,
    updateGame
}