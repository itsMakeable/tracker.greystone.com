module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var User = require('./../models/user')(bookshelf);

    app.get('/api/users', function(req, res) {
        User.fetchAll({})
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

    app.get('/api/users/:id', function(req, res) {

    });

    app.delete('/api/users/:id', function(req, res) {


    });
};
