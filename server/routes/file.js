module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var File = require('./../models/file')(bookshelf);

    app.get('/api/files', function(req, res) {
        File.fetchAll({})
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

    app.get('/api/files/:id', function(req, res) {

    });

    app.post('/api/files', function(req, res) {
        var file = req.body;
        var newFile = new File({
            name: file.name,
            user_id: req.user.user_id,
            field_id: file.field_id,
            is_active: true
        });
        newFile
            .save()
            .then(function(model) {
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

    app.delete('/api/files/:id', function(req, res) {


    });
};
