module.exports = function(app) {

    var multer = require('multer');
    var path = require('path');
    var Promise = require('bluebird');
    var bookshelf = app.get('bookshelf');
    var File = require('./../models/file')(bookshelf);
    var Event = require('./../models/event')(bookshelf);

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
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 16 /* 16MB (bytes)*/
        }
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

    app.post('/api/files', upload.array('file', 3), function(req, res) {
        console.log(req.files);
        if (!req.body.field_id || !req.body.task_id) {
            res.json(503, {
                result: 'error',
                error: 'Missing field_id'
            });
        } else if (req.files.length > 0) {
            var filesPromises = [];
            req.files.forEach(function(file) {
                var newFile = new File({
                    name: file.originalname,
                    user_id: req.user.user_id,
                    field_id: Number(req.body.field_id),
                    is_active: true,
                    path: file.path,
                    created_at: new Date()
                });
                filesPromises.push(newFile.save().then(function(model) {
                    var file = model.toJSON();
                    var newEvent = new Event({
                        type: 'NEW_FILE',
                        created_at: new Date(),
                        user_id: req.user.user_id,
                        file_id: file.file_id,
                        file_name: file.name,
                        task_id: Number(req.body.task_id)
                    });
                    newEvent.save()
                        .then(function(model) {
                            return model.load(['user', 'file', 'file.field']);
                        })
                        .then(function(model) {
                            req.io.emit('NEW_EVENT', {
                                data: model.toJSON()
                            });
                        });
                    return model.load(['user']);
                }));
            });
            Promise.all(filesPromises)
                .then(function(files) {
                    console.log(files);
                    res.json(files);
                })
                .catch(function(error) {
                    res.json(503, {
                        result: 'error',
                        error: error.code
                    });
                });
        } else {
            res.json(503, {
                result: 'error',
                error: 'Invalid operation'
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
                var prevFile = null;
                new File({
                        file_id: req.params.id,
                    })
                    .fetch({
                        require: true,
                        withRelated: ['field']
                    })
                    .then(function(model) {
                        prevFile = model.toJSON();
                        return model.save({
                            is_active: false
                        }, {
                            patch: true
                        });
                    })
                    .then(function(model) {
                        console.log(prevFile);
                        var newEvent = new Event({
                            type: 'DELETE_FILE',
                            created_at: new Date(),
                            user_id: req.user.user_id,
                            file_id: req.params.id,
                            task_id: prevFile.field.task_id
                        });
                        newEvent.save()
                            .then(function(model) {
                                return model.load(['user', 'file']);
                            })
                            .then(function(model) {
                                req.io.emit('NEW_EVENT', {
                                    data: model.toJSON()
                                });
                            });

                        var newFile = new File({
                            name: req.file.originalname,
                            user_id: req.user.user_id,
                            field_id: Number(req.body.field_id),
                            is_active: true,
                            path: req.file.path,
                            created_at: new Date()
                        });
                        return newFile.save();
                    })
                    .then(function(model) {
                        var file = model.toJSON();
                        var newEvent = new Event({
                            type: 'NEW_FILE',
                            created_at: new Date(),
                            user_id: req.user.user_id,
                            file_id: file.file_id,
                            file_name: file.name,
                            task_id: prevFile.field.task_id
                        });
                        newEvent.save()
                            .then(function(model) {
                                return model.load(['user', 'file', 'file.field']);
                            })
                            .then(function(model) {
                                req.io.emit('NEW_EVENT', {
                                    data: model.toJSON()
                                });
                            });
                        return model.load(['user']);
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

        } else if (req.body.name) {
            // for renaming a file is just a change in the name.
            var file = null;
            new File({
                    file_id: req.params.id,
                })
                .fetch({
                    require: true,
                    withRelated: ['field']
                })
                .then(function(model) {
                    file = model.toJSON().name;
                    return model.save({
                        name: req.body.name
                    }, {
                        patch: true
                    });
                })
                .then(function(model) {
                    file = model.toJSON();
                    console.log(file);
                    var newEvent = new Event({
                        type: 'CHANGE_FILE_NAME',
                        created_at: new Date(),
                        user_id: req.user.user_id,
                        file_id: req.params.id,
                        file_name: req.body.name,
                        old_file_name: file.name,
                        task_id: file.field.task_id
                    });
                    newEvent.save()
                        .then(function(model) {
                            return model.load(['user', 'file']);
                        })
                        .then(function(model) {
                            req.io.emit('NEW_EVENT', {
                                data: model.toJSON()
                            });
                        });
                    return model.load(['user']);
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
        } else {
            res.json(503, {
                result: 'error',
                error: 'Invalid operation'
            });
        }
    });

    // deleting a file is setting is_active to false.
    app.delete('/api/files/:id', function(req, res) {
        var file = null;
        new File({
                file_id: req.params.id,
            })
            .fetch({
                required: true,
                withRelated: ['field']
            })
            .then(function(model) {
                file = model.toJSON();
                return model.save({
                    is_active: false
                }, {
                    patch: true
                });
            })
            .then(function(model) {
                console.log(model.toJSON());
                var newEvent = new Event({
                    type: 'DELETE_FILE',
                    created_at: new Date(),
                    user_id: req.user.user_id,
                    file_id: req.params.id,
                    task_id: file.field.task_id
                });
                newEvent.save()
                    .then(function(model) {
                        return model.load(['user', 'file']);
                    })
                    .then(function(model) {
                        req.io.emit('NEW_EVENT', {
                            data: model.toJSON()
                        });
                    });
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
