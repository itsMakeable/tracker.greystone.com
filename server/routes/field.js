module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Field = require('./../models/field')(bookshelf);

    app.get('/api/fields', function(req, res) {
        Field.fetchAll({})
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

    app.get('/api/fields/:id', function(req, res) {

    });

    app.post('/api/fields', function(req, res) {

    });

    app.delete('/api/fields/:id', function(req, res) {


    });
};
