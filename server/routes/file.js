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
            fileSize: 1024 * 1024 * 16
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
                    created_at: new Date().getTime()
                });
                filesPromises.push(newFile.save().then(function(model) {
                    var file = model.toJSON();
                    var newEvent = new Event({
                        type: 'NEW_FILE',
                        created_at: new Date().getTime(),
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

    app.put('/api/files/:id', upload.single('file'), function(req, res) {
        if (req.file) {
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
                        var newEvent = new Event({
                            type: 'DELETE_FILE',
                            created_at: new Date().getTime(),
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
                            created_at: new Date().getTime()
                        });
                        return newFile.save();
                    })
                    .then(function(model) {
                        var file = model.toJSON();
                        var newEvent = new Event({
                            type: 'NEW_FILE',
                            created_at: new Date().getTime(),
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
                        res.json(503, {
                            result: 'error',
                            error: error.code
                        });
                    });
            }

        } else if (req.body.name) {
            var old_file_name = null;
            var ext = null;
            var prev_file = null;
            new File({
                    file_id: req.params.id,
                })
                .fetch({
                    require: true,
                    withRelated: ['field']
                })
                .then(function(model) {
                    prev_file = model.toJSON();
                    old_file_name = prev_file.name;
                    var fileInformation = path.parse(old_file_name);
                    ext = fileInformation.ext;
                    return model.save({
                        name: req.body.name
                    }, {
                        patch: true
                    });
                })
                .then(function(model) {
                    var file = model.toJSON();
                    var newEvent = new Event({
                        type: 'CHANGE_FILE_NAME',
                        created_at: new Date().getTime(),
                        user_id: req.user.user_id,
                        file_id: req.params.id,
                        file_name: file.name,
                        old_file_name: old_file_name,
                        task_id: prev_file.field.task_id
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
                var newEvent = new Event({
                    type: 'DELETE_FILE',
                    created_at: new Date().getTime(),
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
                res.json(503, {
                    result: 'error',
                    error: error.code
                });
            });

    });
};
