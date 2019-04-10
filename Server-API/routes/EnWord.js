var restify = require('restify');
const NewWord = require('../controller/EnWord')
const AllWords = require('../controller/EnWord')
const history = require('../controller/history')

module.exports.routes = function(server) {

    server.post('/new/en/word', NewWord.createNewEnWord);
    server.post('/new/correctWord', NewWord.createCorrectWord);
    server.get('/words/:title', AllWords.getAllEnWords);
    server.get('/wordsTi/:title', AllWords.getAllTiWords);
    server.get('/wordsC', AllWords.getAllCorrect);
    server.put('/add/like/:title', NewWord.addLike);
    server.post('/add/history', history.addNewHistory);
   server.get('/get/history', history.getHistory);
};
