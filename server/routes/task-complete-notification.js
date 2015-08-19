module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var TaskCompleteNotification = require('./../models/task-complete-notification')(bookshelf);

    app.get('/api/task-complete-notifications', function(req, res) {
        TaskCompleteNotification
            .where({
                to_user_id: req.user.user_id,
                // task_id: Number(req.query.task_id)
            })
            .fetchAll({
                withRelated: [
                    'user',
                    'task',
                ]
            })
            .then(function(model) {
                console.log(model);
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
                    err: err.code
                });
            });
    });

    app.delete('/api/task-complete-notifications/:id', function(req, res) {
        new TaskCompleteNotification({
                task_complete_notification_id: req.params.id
            })
            .destroy()
            .then(function(model) {
                console.log(model);
                res.json();
            })
            .catch(function(err) {
                console.log(err);
                res.json(503, {
                    result: 'error',
                    err: err.code
                });
            });
    });

};
