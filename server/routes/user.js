module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var User = require('./../models/user')(bookshelf);

    app.get('/api/users', function(req, res) {
        User.fetchAll({})
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

    app.get('/api/users/:id', function(req, res) {

    });

    app.post('/api/users', function(req, res) {

    });

    app.delete('/api/users/:id', function(req, res) {


    });
};
