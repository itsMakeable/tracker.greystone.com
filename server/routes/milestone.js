module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Milestone = require('./../models/milestone')(bookshelf);

    app.get('/api/milestones', function(req, res) {
        Milestone.fetchAll({})
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

    app.get('/api/milestones/:id', function(req, res) {

    });

    app.post('/api/milestones', function(req, res) {

    });

    app.delete('/api/milestones/:id', function(req, res) {


    });
};
