module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Task = require('./../models/task')(bookshelf);
    var Event = require('./../models/event')(bookshelf);
    var TaskCompleteNotification = require('./../models/task-complete-notification')(bookshelf);

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

    app.put('/api/tasks/:id', function(req, res) {
        // Create Event for clear assing and for assigning other user.
        console.log(req.body);
        console.log(req.body.hasOwnProperty('user_id'));
        console.log(req.body.hasOwnProperty('is_complete'));
        if (req.body.hasOwnProperty('user_id')) {
            var prev_user = null;
            new Task({
                    task_id: Number(req.params.id)
                })
                .fetch({
                    require: true
                })
                .then(function(model) {
                    prev_user = model.toJSON().user_id;
                    return model.save({
                        user_id: req.body.user_id
                    }, {
                        patch: true
                    });
                })
                .then(function(model) {
                    var newEventOptions = {
                        created_at: new Date().getTime(),
                        user_id: req.user.user_id,
                        task_owner_user_id: req.body.user_id,
                        task_id: Number(req.params.id)
                    };
                    if (req.body.user_id) {
                        newEventOptions.type = 'ASSIGN_USER';
                    } else {
                        newEventOptions.type = 'CLEAR_ASSIGN';
                    }
                    var newEvent = new Event(newEventOptions);
                    newEvent.save()
                        .then(function(model) {
                            if (req.body.user_id) {
                                return model.load(['user', 'assigned_user']);
                            } else {
                                return model.load(['user']);
                            }
                        })
                        .then(function(model) {
                            req.io.emit('NEW_EVENT', {
                                data: model.toJSON()
                            });
                        });
                    return model.load(['user']);
                })
                .then(function(model) {
                    var task = model.toJSON();
                    res.json(task);
                })
                .catch(function(error) {
                    console.log(error);
                    res.json(503, {
                        result: 'error',
                        error: error.code
                    });
                });
        } else if (req.body.hasOwnProperty('is_complete')) {
            new Task({
                    task_id: Number(req.params.id)
                })
                .fetch({
                    require: true
                })
                .then(function(model) {
                    return model.save({
                        is_complete: req.body.is_complete
                    }, {
                        patch: true
                    });
                })
                .then(function(model) {
                    var newEventOptions = {
                        created_at: new Date().getTime(),
                        user_id: req.user.user_id,
                        task_id: Number(req.params.id)
                    };
                    if (req.body.is_complete) {
                        newEventOptions.type = 'COMPLETE';
                    } else {
                        newEventOptions.type = 'INCOMPLETE';
                    }
                    var newEvent = new Event(newEventOptions);
                    newEvent.save()
                        .then(function(model) {
                            return model.load(['user', 'task']);
                        })
                        .then(function(model) {
                            req.io.emit('NEW_EVENT', {
                                data: model.toJSON()
                            });
                        });
                    if (newEventOptions.type == 'COMPLETE') {
                        var newNotification = new TaskCompleteNotification({
                            created_at: new Date().getTime(),
                            user_id: req.user.user_id,
                            task_id: Number(req.params.id)
                        });
                        newNotification.save()
                            .then(function(model) {
                                return model.load(['user', 'task.user']);
                            })
                            .then(function(model) {
                                req.io.emit('TASK_NOTIFICATION', {
                                    data: model.toJSON()
                                });
                            });
                    }
                    return model.load(['user']);
                })
                .then(function(model) {
                    var task = model.toJSON();
                    res.json(task);
                })
                .catch(function(error) {
                    console.log(error);
                    res.json(503, {
                        result: 'error',
                        error: error.code
                    });
                });
        }

    });

    app.delete('/api/tasks/:id', function(req, res) {

    });

};
