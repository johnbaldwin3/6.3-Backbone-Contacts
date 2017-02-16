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


var ContactHeaderView = Backbone.View.extend ({
  tagName: 'h1',
  id: "app-header",
  className: 'app-header',
  render : function(){
    this.$el.text("Contact Tree");
    
    return this;
  }
});


var ContactFormView = Backbone.View.extend({
  tagName: 'form',
  id: "contact-former",
  className: "col-md-12",
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
    var contactInfo = this.$el.serializeObject() ;
    //this.collection.add(contactInfo);
    //this.model.set(contactInfo);
    this.collection.create(contactInfo);
    //console.log('this.collection', this.collection);
    this.$el.val('');
  }
});

var ContactListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group col-md-12',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderNewContact);
  },
  render: function() {
    return this;
  },
  renderNewContact: function(newContactee) {
    var contactPerson = new ContactPersonView({model: newContactee});
    //console.log('conPerson', contactPerson);
    this.$el.append(contactPerson.render().el);
  }

});

var ContactPersonView = Backbone.View.extend({
  tagName: 'li',
  className:'list-group-item contact-person',
  template: newContactTemplate,
  events: {
    'click .delete-contact': 'deleteThem'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function() {
    var context = this.model.toJSON();
    //console.log("thismod",context);
    this.$el.append(this.template(context));
    return this;
  },
  delete: function(event){
   event.preventDefault();
   this.model.destroy();
 }
});




module.exports = {
  ContactFormView: ContactFormView,
  ContactListView: ContactListView,
  ContactPersonView: ContactPersonView,
  ContactHeaderView: ContactHeaderView

}
