module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Response = require('./../models/response')(bookshelf);

    app.get('/api/responses', function(req, res) {
        Response.fetchAll({})
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

    app.get('/api/responses/:id', function(req, res) {

    });

    app.post('/api/responses', function(req, res) {

    });

    app.delete('/api/responses/:id', function(req, res) {


    });
};
