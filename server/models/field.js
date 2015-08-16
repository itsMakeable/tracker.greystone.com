module.exports = function(bookshelf) {

    var File = require('./file')(bookshelf);

    if (bookshelf.model('Field')) {
        return bookshelf.model('Field');
    } else {
        var Field = bookshelf.Model.extend({
            tableName: 'fields',
            idAttribute: 'field_id',
            files: function() {
                return this.hasMany('File', ['field_id'])
                    .query(function(qb) {
                        qb.where('is_active', true);
                    });
            }
        });
        return bookshelf.model('Field', Field);
    }
};
