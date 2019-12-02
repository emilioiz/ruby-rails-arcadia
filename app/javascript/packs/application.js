// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
 
import ReactOnRails from 'react-on-rails';
 
import PrescriptionForm from '../bundles/Prescription/components/PrescriptionForm';
import PrescriptionList from '../bundles/Prescription/components/PrescriptionList';
import Home from '../bundles/Home/components/Home';
import EventForm from '../bundles/Event/components/EventForm';
import SignUpForm from '../bundles/SignUpForm/SignUpForm';
import Agenda from '../bundles/Agenda/components/Agenda'
 
ReactOnRails.register({ PrescriptionForm, EventForm, PrescriptionList, Home, SignUpForm, Agenda });
Notification.requestPermission().then(function (result) {});
