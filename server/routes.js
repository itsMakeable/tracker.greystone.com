module.exports = function(app) {

    app.get('/api/:table', function(req, res) {
        req.mysql.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ', err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err: err.code
                });
            } else {
                var sql = null;
                if (req.params.table == 'tasks') {
                    // return the tasks array with this information populated.
                    // var tasks = [{
                    //     id: '',
                    //     name: '',
                    //     description: '',
                    //     milestone: {},
                    //     responses: [{
                    //         id: ''
                    //         user: {},
                    //         created_at: '',
                    //         field: {},
                    //         data: ''
                    //     }];
                    //     messages: [{
                    //         id: ''
                    //         user: {},
                    //         text: '',
                    //         created_at: ''
                    //     }];
                    //     fields: [{
                    //         id: '',
                    //         rank: '',
                    //         name: '',
                    //         data: '',
                    //         active_response: {
                    //             id: '',
                    //             user: {},
                    //             data: '',
                    //             created_at: ''
                    //         }
                    //     }]
                    // }];
                    sql = 'SELECT * FROM ' + req.params.table;
                } else {
                    sql = 'SELECT * FROM ' + req.params.table;
                }
                connection.query({
                    sql: sql
                }, function(err, rows) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send();
                    } else {
                        res.json(rows);
                        connection.release();
                    }
                });
            }
        });
    });

    app.get('/api/:table/:id', function(req, res) {
        req.mysql.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ', err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err: err.code
                });
            } else {
                var table = req.params.table;
                var id_ref = table.substring(0, table.length - 1) + '_id';
                var id = req.params.id;
                connection.query({
                    sql: 'SELECT * FROM ' + table + ' WHERE ' + id_ref + ' = ?',
                    values: [id]
                }, function(err, rows) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send();
                    } else {
                        if (rows.length === 0) {
                            res.statusCode = 204;
                            res.send();
                        } else {
                            var response = rows[0];
                            res.json(response);
                        }
                        connection.release();
                    }
                });
            }
        });
    });

    app.post('/api/response', function(req, res) {
        req.mysql.getConnection(function(err, connection) {
            if (err) {
                console.error('CONNECTION error: ', err);
                res.statusCode = 503;
                res.send({
                    result: 'error',
                    err: err.code
                });
            } else {
                console.log(req.body);
                var response = {
                    user_id: req.body.user_id,
                    field_id: req.body.field_id,
                    data: req.body.data,
                    created_at: new Date()
                };
                connection.query({
                    sql: 'INSERT INTO responses SET ?',
                    values: [response]
                }, function(err, result) {
                    console.log(result);
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err: err.code
                        });
                    } else {
                        connection.query({
                            sql: 'SELECT * FROM responses WHERE response_id = ?',
                            values: [result.insertId]
                        }, function(err, responses) {
                            if (err) {
                                console.error(err);
                                res.statusCode = 500;
                                res.send({
                                    result: 'error',
                                    err: err.code
                                });
                            } else {
                                res.json(responses[0]);
                                req.io.emit('new:response', {
                                    response: responses[0]
                                });
                            }
                            connection.release();
                        });
                    }
                });
            }
        });

    });

    app.delete('/api/response/:response_id', function(req, res) {


    });

    // For Angular
    app.get('*', function(req, res) {
        res.sendfile('./client/index.html');
    });

};
