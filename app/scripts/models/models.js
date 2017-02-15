var $ = require('jquery');
var Backbone = require('backbone');

var Contact = Backbone.Model.extend({

});

var ContactCollection = Backbone.Collection.extend({
  model: Contact
});


module.exports = {
  Contact: Contact,
  ContactCollection: ContactCollection
}
