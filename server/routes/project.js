module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Project = require('./../models/project')(bookshelf);

    app.get('/api/projects', function(req, res) {
        Project.fetchAll({
                withRelated: [
                    'milestones',
                    'milestones.tasks',
                    'milestones.tasks.fields',
                    'milestones.tasks.user',
                    'milestones.tasks.fields.files',
                    'milestones.tasks.fields.files.user'
                ]
            })
            .then(function(model) {
                res.json(model.toJSON());
            })
            .catch(function(error) {
                console.log(error);
                res.json(503, {
                    result: 'error',
                    error: error.code
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
