const router = require("express").Router();

const usersHelper = require('./userModel')

router.get('/', (req, res) =>{
    usersHelper.find()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage: err.message})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    usersHelper.findById(id)
    .then( result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage: err.message})
    })
})


router.get('/search/:username', (req, res) => {
    const username = req.params

    usersHelper.findBy(username)
    .then( result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage: err.message})
    })
})
module.exports = router