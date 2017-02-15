var $ = require('jquery');

var views = require('./views/contactViews.js');
var models = require('./models/models.js');

$(function(){

  var myContacts = new models.ContactCollection();

  var contactFormView = new views.ContactFormView();
  $('.new-contact-form').html(contactFormView.render().$el);

  var contactListView = new views.ContactListView({collection: ContactCollection});
  











});
