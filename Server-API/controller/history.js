var mongoose = require('mongoose');
const History = mongoose.model("History");


const addNewHistory = (req, res, next) => {
    let history = new History(req.body);
    history.save().then(()=>{
        res.send('saved to history database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}


const getHistory=(req, res, next)=>{
    history.find({}).sort({created_at : -1}).limit(3)
    .then((word)=>{
        res.send({
            history: word,
    })})
    .catch((err)=>{res.send(err)})
}


module.exports = {
    addNewHistory,
    getHistory
}