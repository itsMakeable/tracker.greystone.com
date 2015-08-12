module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Task = require('./../models/task')(bookshelf);

    app.get('/api/tasks', function(req, res) {
        Task.fetchAll({
                withRelated: [
                    'responses',
                    'fields.active_response',
                    'fields.responses'
                ]
            })
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

    app.get('/api/tasks/:id', function(req, res) {

    });

    app.post('/api/tasks', function(req, res) {

    });

    app.delete('/api/tasks/:id', function(req, res) {

    });

};
