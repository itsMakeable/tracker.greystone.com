module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Event = require('./../models/event')(bookshelf);

    app.get('/api/events', function(req, res) {
        console.log(req.query);
        new Event({
                task_id: req.query.task_id
            })
            .fetchAll({
                withRelated: [
                    'assigned_user',
                    'user',
                    'file',
                    'file.field'
                ]
            })
            .then(function(model) {
                console.log(model.toJSON());
                res.json(model.toJSON());
            })
            .catch(function(err) {
                res.json(503, {
                    result: 'error',
                    err: err.code
                });
            });
    });

    app.get('/api/events/:id', function(req, res) {

    });

    app.post('/api/events', function(req, res) {
        var newEvent = new Event({
            type: 'MESSAGE',
            created_at: new Date(),
            user_id: req.user.user_id,
            task_id: req.body.task_id,
            message: req.body.message
        });
        newEvent.save()
            .then(function(model) {
                return model.load(['user']);
            })
            .then(function(model) {
                req.io.emit('NEW_EVENT', {
                    data: model.toJSON()
                });
                res.json(model.toJSON());
            })
            .catch(function(err) {
                res.json(503, {
                    result: 'error',
                    err: err.code
                });
            });
    });

    app.delete('/api/events/:id', function(req, res) {


    });
};
