module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Event = require('./../models/event')(bookshelf);
    var ViewTask = require('./../models/view-task')(bookshelf);
    var sortBy = require('lodash.sortby');

    app.get('/api/events', function(req, res) {
        console.log('/api/events');
        console.log(req.query);
        if (req.query.created_at) {
            new ViewTask({
                    user_id: req.user.user_id,
                    task_id: Number(req.query.task_id)
                })
                .fetch({
                    require: true
                })
                .then(function(model) {
                    console.log('ViewTask');
                    console.log(model.toJSON());
                    return Event.query('where', 'created_at', '>', model.toJSON().viewed_at).fetchAll();
                })
                .then(function(model) {
                    console.log('Events');
                    console.log(model);
                    if (model && model.toJSON().length > 0) {
                        sortBy(model.toJSON(), String);
                        res.json(model.toJSON());
                    } else if (model) {
                        res.json([model]);
                    } else {
                        res.json([]);
                    }

                })
                .catch(ViewTask.NotFoundError, function(error) {
                    console.log('No View Task Added Yet');
                    new Event({
                            task_id: Number(req.query.task_id)
                        })
                        .fetchAll({})
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
                })
                .catch(Event.NotFoundError, function(error) {
                    console.log('All Events Saw');
                    res.json([]);
                })
                .catch(function(err) {
                    console.log(err);
                    res.json(503, {
                        result: 'error',
                        err: err.code
                    });
                });
        } else {
            new Event({
                    task_id: Number(req.query.task_id)
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
                    res.json(model.toJSON());
                })
                .catch(function(err) {
                    res.json(503, {
                        result: 'error',
                        err: err.code
                    });
                });
        }

    });

    app.get('/api/events/:id', function(req, res) {

    });

    app.post('/api/events', function(req, res) {
        var newEvent = new Event({
            type: 'MESSAGE',
            created_at: new Date().getTime(),
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
