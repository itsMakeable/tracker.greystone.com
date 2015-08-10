module.exports = function(bookshelf) {

    var File = require('./file')(bookshelf);

    if (bookshelf.model('Field')) {
        return bookshelf.model('Field');
    } else {
        var Field = bookshelf.Model.extend({
            tableName: 'fields',
            idAttribute: 'field_id',
            virtuals: {
                model: function() {
                    // return JSON.parse(this.get("data"));
                    return 'Model';
                }
            },
            files: function() {
                return this.hasMany(File, ['field_id']);
            }
        });
        return bookshelf.model('Field', Field);
    }
};
