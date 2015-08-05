module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Field = require('./../models/field')(bookshelf);

    app.get('/api/fields', function(req, res) {
        Field.fetchAll({})
            .then(function(model) {
                console.log(model.toJSON());
                res.json(model.toJSON());
            })
            .catch(function(err) {
                console.error(err);
                res.statusCode = 503;
                res.send({
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
