module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var User = require('./../models/user')(bookshelf);
    var ViewTask = require('./../models/view-task')(bookshelf);

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
        var viewTask = new ViewTask({
            user_id: req.user.user_id,
            task_id: Number(req.body.task_id),
            viewed_at: new Date().getTime()
        });
        viewTask.save()
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

    app.delete('/api/users/:id', function(req, res) {


    });
};
