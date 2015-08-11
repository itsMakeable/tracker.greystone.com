module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Project = require('./../models/project')(bookshelf);

    app.get('/api/projects', function(req, res) {
        Project.fetchAll({
                withRelated: [
                    'milestones',
                    'milestones.tasks',
                    'milestones.tasks.fields',
                    'milestones.tasks.current_user',
                    'milestones.tasks.fields.files'
                ]
            })
            .then(function(model) {
                console.log(model.toJSON());
                res.json(model.toJSON());
            })
            .catch(function(err) {
                console.error(err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err: err.code
                });
            });
    });

    app.get('/api/projects/:id', function(req, res) {

    });

    app.post('/api/projects', function(req, res) {

    });

    app.delete('/api/projects/:id', function(req, res) {


    });

};
