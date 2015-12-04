module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var knex = app.get('knex');
    var User = require('./../models/user')(bookshelf);
    var ViewTask = require('./../models/view-task')(bookshelf, knex);

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

    app.post('/api/users/view_task', function(req, res) {
        ViewTask
            .where({
                task_id: Number(req.body.task_id),
                user_id: req.user.user_id,
            })
            .fetch()
            .then(function(model) {
                var currentTimestamp = new Date().getTime();
                if (model) {
                    console.log('Already a ViewTask for: ' + req.body.task_id);
                    return model.save({
                        viewed_at: Number(currentTimestamp)
                    }, {
                        patch: true
                    });
                } else {
                    console.log('Create New View Task');
                    var viewTask = new ViewTask({
                        user_id: req.user.user_id,
                        task_id: Number(req.body.task_id),
                        viewed_at: Number(currentTimestamp)
                    });
                    return viewTask.save();
                }
            })
            .then(function(model) {
                res.json(model.toJSON());
            })
            .catch(function(err) {
                console.log(err);
                res.json(503, {
                    result: 'error',
                    err: err
                });
            });
    });

    app.delete('/api/users/:id', function(req, res) {


    });
};
