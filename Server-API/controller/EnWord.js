var mongoose = require('mongoose');
const EnWords = mongoose.model("EnWord");
const correctWord = mongoose.model("correctWord");


const createNewEnWord = (req, res, next) => {
    let word = new EnWords(req.body);
    word.save().then(()=>{
        res.send('saved to database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}

const createCorrectWord = (req, res, next) => {
    let correct = new correctWord(req.body);
    correct.save().then(()=>{
        res.send('saved to database')
    }).catch((err)=>{
        res.status(400).send('unable to save to database')
    })
}

const getAllTiWords=(req, res, next)=>{
    word.findOne({translate : req.params.title})
    .then((word)=>{
        res.send({
            words: word,
    })})
    .catch((err)=>{res.send(err)})
}

const getAllCorrect=(req, res, next)=>{
    correctWord.find({})
    .then((correctWord)=>{
        res.send({
            // text: correctWord,
            // oldTranslate: correctWord,
            newTranslate: correctWord
    })})
    .catch((err)=>{res.send(err)})
}
// getAllTechTalks = (req, res, next) => {
//     // const techTalk = new TechTalk(req.body);
//      TechTalk.find({}).sort( { createAt: 1 } )
//         .populate('user_id')
//         .then((TechTalk)=>{res.send({
//             list: TechTalk,
//             isUser: req.session.user
//         })})
//         .catch((err)=>{res.send(err)})
//         }

const getAllEnWords=(req, res, next)=>{
    word.findOne({text : req.params.title})
    .then((word)=>{
        res.send({
            words: word,
    })})
    .catch((err)=>{res.send(err)})
}

const addLike = (req, res, next) => {
    word.findOne({text : req.params.title})
    .then(Nword => {
        Nword.text = req.body.text;
        Nword.translate = req.body.translate;
        Nword.like ++
        Nword.save()
    .then(savedWord => {
        res.send(savedWord)
    });    
    })
}

module.exports = {
    createNewEnWord,
    getAllEnWords,
    getAllTiWords,
    createCorrectWord,
    getAllCorrect,
    addLike
}