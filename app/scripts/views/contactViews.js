var $ = require('jquery');
var Backbone = require('backbone');

var contactFormTemplate = require('../../templates/contactForm.hbs');

var newContactTemplate = require('../../templates/newContact.hbs');

$.fn.serializeObject = function() {
   return this.serializeArray().reduce(function(acum, i) {
     acum[i.name] = i.value;
     return acum;
   }, {});
 };


var ContactFormView = Backbone.View.extend({
  tagName: 'form',
  id: "contact-former",
  //className: "contact-person"
   events: {
      'submit': 'addContactForm'
    },
    template: contactFormTemplate,
  render: function(){
    //console.log(contactFormTemplate);
    this.$el.html(this.template());
    return this;
  },
  addContactForm: function(event) {
    event.preventDefault();
    var contactInfo = $(event.currentTarget).serializeObject() ;
    console.log('hello');
    console.log(contactInfo);
    this.collection.add(contactInfo);
    this.model.set(contactInfo);
    this.model.save();
  }
});

var ContactListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group',
  initialize: function() {

  },
  render: function() {
    return this;
  },
  renderNewContact: function(newContactee) {
    var contactPerson = new ConactPersonView({model: newContactee});
    this.$el.append(contactPerson.render().el);
  }

});

var ContactPersonView = Backbone.View.extend({
  tagName: 'li',
  className:'list-group-item contact-person',
  template: newContactTemplate,
  render: function() {
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  }
});




module.exports = {
  ContactFormView: ContactFormView,
  ContactListView: ContactListView,
  ContactPersonView: ContactPersonView

}
