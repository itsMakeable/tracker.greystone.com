module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    var User = require('./../models/user')(bookshelf);

    app.post('/auth/verify_token', function(req, res) {
        jwt.verify(req.body.token, app.get('SECRET'), function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    decoded: null,
                });
            } else {
                res.json({
                    success: true,
                    decoded: decoded,
                    message: 'Token authenticated.'
                });
            }
        });
    });

    app.post('/auth/signin', function(req, res) {
        User.login(req.body.email, req.body.password)
            .then(function(user) {
                var token = jwt.sign({
                    user_id: user.toJSON().user_id
                }, app.get('SECRET'), {
                    expiresInMinutes: 6000000 * 5
                });
                res.json({
                    user: user.toJSON(),
                    token: token
                });
            })
            .catch(User.NotFoundError, function() {
                res.json(400, {
                    error: req.body.email + ' not found'
                });
            })
            .catch(function(err) {
                res.json(400, {
                    error: 'Error authenticating'
                });
            });
    });

    app.post('/auth/reset_password', function(req, res) {
        var user_id = req.body.user_id;
        var password = req.body.password;
        new User({
                user_id: user_id
            })
            .fetch({
                require: true,
            })
            .then(function(model) {
                if (!model) {
                    res.json(400, {
                        errorMessage: 'User not exists'
                    });
                } else {
                    var passwordHash = bcrypt.hashSync(password, 10);
                    model
                        .save({
                            password: passwordHash
                        })
                        .then(function(model) {
                            var token = jwt.sign({
                                user_id: model.toJSON().user_id
                            }, app.get('SECRET'), {
                                expiresInMinutes: 6000000 * 5
                            });
                            res.json({
                                user: model.toJSON(),
                                token: token
                            });
                        });
                }
            });
    });

    app.post('/auth/signup', function(req, res) {
        var user = req.body;
        var usernamePromise = null;
        usernamePromise = new User({
                email: user.email
            })
            .fetch()
            .then(function(model) {
                if (model) {
                    res.json(400, {
                        errorMessage: 'Email already exists'
                    });
                } else {
                    var salt = bcrypt.genSaltSync(10);
                    var passwordHash = bcrypt.hashSync(user.password, salt);
                    var signUpUser = new User({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: passwordHash
                    });

                    signUpUser
                        .save()
                        .then(function(model) {
                            var token = jwt.sign({
                                user_id: model.toJSON().user_id
                            }, app.get('SECRET'), {
                                expiresInMinutes: 6000000 * 5
                            });
                            res.json({
                                user: model.toJSON(),
                                token: token
                            });
                        });
                }
            });
    });


};
