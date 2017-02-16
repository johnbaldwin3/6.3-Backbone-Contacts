var $ = require('jquery');

var views = require('./views/contactViews.js');
var models = require('./models/models.js');

$(function(){

  var contactHeader = new views.ContactHeaderView();
  $('.headstrong').html(contactHeader.render().$el);

  var myContacts = new models.ContactCollection();
  console.log('mycontact', myContacts);

  var contactFormView = new views.ContactFormView({collection: myContacts});
  $('.new-contact-form').html(contactFormView.render().el);

  var contactListView = new views.ContactListView({collection: myContacts});
  $('.contact-list').append(contactListView.render().el);

  myContacts.fetch();










});
