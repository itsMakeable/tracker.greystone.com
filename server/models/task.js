module.exports = function(bookshelf) {

    var Field = require('./field')(bookshelf);
    var Response = require('./response')(bookshelf);

    if (bookshelf.model('Task')) {
        return bookshelf.model('Task');
    } else {
        var Task = bookshelf.Model.extend({
            tableName: 'tasks',
            idAttribute: 'task_id',
            fields: function() {
                return this.hasMany(Field, ['task_id']);
            },
            responses: function() {
                return this.hasMany(Response, ['task_id']).through(Field, ['field_id']);
            }
        });

        return bookshelf.model('Task', Task);
    }



};
