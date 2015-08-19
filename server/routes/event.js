module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var knex = app.get('knex');
    var Event = require('./../models/event')(bookshelf);
    var ViewTask = require('./../models/view-task')(bookshelf, knex);
    var sortBy = require('lodash.sortby');

    app.get('/api/events', function(req, res) {
        // console.log('/api/events');
        // console.log(req.query);
        if (req.query.created_at) {
            ViewTask
                .where({
                    user_id: req.user.user_id,
                    task_id: Number(req.query.task_id)
                })
                .query('orderBy', 'user_view_task_id', 'desc')
                .query('limit', 1)
                .fetch({})
                .then(function(model) {
                    // console.log('ViewTasks');
                    if (model) {
                        var task = model.toJSON();
                        // console.log(tasks);
                        // filter task_id
                        return Event
                            .query('where', 'created_at', '>', task.viewed_at)
                            .query('where', 'task_id', '=', Number(req.query.task_id))
                            .fetchAll({});
                    } else {
                        return Event
                            .query('where', 'task_id', '=', Number(req.query.task_id))
                            .fetchAll({});
                    }
                })
                .then(function(model) {
                    // console.log('Events');
                    // console.log(model);
                    if (model && model.length > 0) {
                        var events = model.toJSON();
                        res.json(events);
                    } else {
                        res.json([]);
                    }
                })
                .catch(Event.NotFoundError, function(error) {
                    // console.log('All Events Saw');
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
                    console.log(err);
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
