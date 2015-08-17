module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Task = require('./../models/task')(bookshelf);
    var Event = require('./../models/event')(bookshelf);

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
                var newEvent = new Event({
                    type: 'ASSIGN_USER',
                    created_at: new Date().getTime(),
                    user_id: req.user.user_id,
                    task_owner_user_id: req.body.user_id,
                    task_id: Number(req.params.id)
                });
                newEvent.save()
                    .then(function(model) {
                        return model.load(['user', 'assigned_user']);
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
    });

    app.delete('/api/tasks/:id', function(req, res) {

    });

};
