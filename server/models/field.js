module.exports = function(bookshelf) {

    var Response = require('./response')(bookshelf);

    if (bookshelf.model('Field')) {
        return bookshelf.model('Field');
    } else {
        var Field = bookshelf.Model.extend({
            tableName: 'fields',
            idAttribute: 'field_id',
            virtuals: {
                model: function() {
                    return JSON.parse(this.get("data"));
                }
            },
            active_response: function() {
                return this.belongsTo(Response, 'active_response_id');
            },
            responses: function() {
                return this.hasMany(Response, ['field_id']);
            }
        });
        return bookshelf.model('Field', Field);
    }
};
