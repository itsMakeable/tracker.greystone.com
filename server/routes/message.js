module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Message = require('./../models/message')(bookshelf);

    app.get('/api/messages', function(req, res) {
        Message.fetchAll({})
            .then(function(model) {
                res.json(model.toJSON());
            })
            .catch(function(err) {
                res.json(503, {
                    result: 'error',
                    err: err.code
                });
            });
    });

    app.get('/api/messages/:id', function(req, res) {

    });

    app.post('/api/messages', function(req, res) {

    });

    app.delete('/api/messages/:id', function(req, res) {


    });
};
