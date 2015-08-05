module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var Milestone = require('./../models/milestone')(bookshelf);

    app.get('/api/milestones', function(req, res) {
        Milestone.fetchAll({})
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

    app.get('/api/milestones/:id', function(req, res) {

    });

    app.post('/api/milestones', function(req, res) {

    });

    app.delete('/api/milestones/:id', function(req, res) {


    });
};
