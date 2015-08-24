module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var knex = app.get('knex');
    var Event = require('./../models/event')(bookshelf);
    var ViewTask = require('./../models/view-task')(bookshelf, knex);
    var sortBy = require('lodash.sortby');

    app.get('/api/events', function(req, res) {
        if (req.query.created_at) {
            ViewTask
                .query({
                    where: {
                        task_id: Number(req.query.task_id),
                        user_id: Number(req.user.user_id)
                    }
                })
                .query('limit', 1)
                .fetch()
                .then(function(model) {
                    if (model) {
                        var viewTask = model.toJSON();
                        console.log('Viewed Tasks for: ' + req.query.task_id);
                        console.log(viewTask);
                        return Event
                            .query('where', 'task_id', '=', Number(req.query.task_id))
                            .query('where', 'created_at', '>', viewTask.viewed_at)
                            .fetchAll({});
                    } else {
                        return Event
                            .query('where', 'task_id', '=', Number(req.query.task_id))
                            .fetchAll({});
                    }
                })
                .then(function(model) {
                    if (model && model.length > 0) {
                        var events = model.toJSON();
                        res.json(events);
                    } else {
                        res.json([]);
                    }
                })
                .catch(Event.NotFoundError, function(error) {
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
            Event
                .where({
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
                    if (model) {
                        res.json(model.toJSON());
                    } else {
                        res.json([]);
                    }
                })
                .catch(function(err) {
                    res.json(503, {
                        result: 'error',
                        err: err
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
