module.exports = function(app) {

    var multer = require('multer');
    var path = require('path');
    var Promise = require('bluebird');
    var bookshelf = app.get('bookshelf');
    var File = require('./../models/file')(bookshelf);
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb) {
            var fileInformation = path.parse(file.originalname);
            cb(null, fileInformation.name + '-' + new Date().getTime() + fileInformation.ext);
        }
    });

    var upload = multer({
        storage: storage
    });

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
    app.post('/api/files', upload.array('file', 3), function(req, res) {
        if (!req.body.field_id) {
            res.json(503, {
                result: 'error',
                error: 'Missing field_id'
            });
        } else {
            var filesPromises = [];
            req.files.forEach(function(file) {
                var newFile = new File({
                    name: file.originalname,
                    user_id: req.user.user_id,
                    field_id: Number(req.body.field_id),
                    is_active: true,
                    path: file.path
                });
                filesPromises.push(newFile.save());
            });
            Promise.all(filesPromises)
                .then(function(files) {
                    res.json(files);
                })
                .catch(function(error) {
                    res.json(503, {
                        result: 'error',
                        error: error.code
                    });
                });
        }

    });





    // should also be able to upload a new file here for replacing an
    // existing one. 
    app.put('/api/files/:id', upload.single('file'), function(req, res) {
        if (req.file) {
            // for updating a file, set the current file_id to update,
            // set it to is_active false and create the new one and set
            // active.
            if (!req.body.field_id) {
                res.json(503, {
                    result: 'error',
                    error: 'Missing field_id'
                });
            } else {
                new File({
                        file_id: req.params.id,
                    })
                    .save({
                        is_active: false
                    }, {
                        patch: true
                    })
                    .then(function(model) {
                        var newFile = new File({
                            name: req.file.originalname,
                            user_id: req.user.user_id,
                            field_id: Number(req.body.field_id),
                            is_active: true,
                            path: req.file.path
                        });
                        return newFile.save();
                    })
                    .then(function(file) {
                        res.json(file);
                    })
                    .catch(function(error) {
                        console.log(error);
                        res.json(503, {
                            result: 'error',
                            error: error.code
                        });
                    });
            }

        } else {
            // for renaming a file is just a change in the name.
            new File({
                    file_id: req.params.id,
                })
                .save({
                    name: req.body.name
                }, {
                    patch: true
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
        }
    });

    // deleting a file is setting is_active to false.
    app.delete('/api/files/:id', function(req, res) {
        new File({
                file_id: req.params.id,
            })
            .save({
                is_active: false
            }, {
                patch: true
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
};
