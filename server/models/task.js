module.exports = function(bookshelf) {

    var Field = require('./field')(bookshelf);
    var User = require('./user')(bookshelf);

    if (bookshelf.model('Task')) {
        return bookshelf.model('Task');
    } else {
        var Task = bookshelf.Model.extend({
            tableName: 'tasks',
            idAttribute: 'task_id',
            fields: function() {
                return this.hasMany(Field, ['task_id']);
            },
            user: function() {
                return this.belongsTo(User, ['user_id']);
            }
        });

        return bookshelf.model('Task', Task);
    }

};
