module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var File = require('./../models/file')(bookshelf);

    app.get('/api/files', function(req, res) {
        File.fetchAll({})
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

    app.get('/api/files/:id', function(req, res) {

    });


    // move the upload logic here.
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
                res.json(503, {
                    result: 'error',
                    err: err.code
                });
            });

    });

    // for renaming a file is just a change in the name.

    // for updating a file, set the current file_id to update,
    // set it to is_active false and create the new one and set
    // active.

    // should also be able to upload a new file here for replacing an
    // existing one. 
    app.put('/api/files', function(req, res) {

        res.json({
            response: 'Put to files'
        });
    });

    app.delete('/api/files/:id', function(req, res) {


    });
};
