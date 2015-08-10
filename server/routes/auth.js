module.exports = function(app) {

    var bookshelf = app.get('bookshelf');
    var bcrypt = require('bcrypt');
    var jwt = require('jsonwebtoken');
    var User = require('./../models/user')(bookshelf);

    app.post('/auth/signin', function(req, res) {
        console.log(req.body);
        User.login(req.body.email, req.body.password)
            .then(function(user) {
                var token = jwt.sign(user.omit('password'), app.get('SECRET'), {
                    expiresInMinutes: 60 * 5
                });
                res.json({
                    token: token
                });
            }).catch(User.NotFoundError, function() {
                res.json(400, {
                    error: req.body.email + ' not found'
                });
            }).catch(function(err) {
                console.log(err);
                res.json(400, {
                    error: 'Error authenticating'
                });
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
                console.log(model);
                if (model) {
                    res.json(400, {
                        errorMessage: 'Email already exists'
                    });
                } else {
                    var salt = bcrypt.genSaltSync(10);
                    var passwordHash = bcrypt.hashSync(user.password, salt);
                    var signUpUser = new User({
                        email: user.email,
                        password: passwordHash
                    });

                    signUpUser.save().then(function(model) {
                        // return user and token.
                        res.json({
                            user: model.toJSON(),
                            token: 'My new token'
                        });
                    });
                }
            });
    });


};