(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  function FormHandler(selector) {
    if (!selector) {
      // alert('No selector provided');
      throw new Error('No selector provided');

    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

  }
FormHandler.prototype.addInputHandler = function (fn) {
    console.log('setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
        var emailAddress = event.target.value;
        var message = '';
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          message = emailAddress + 'is not an auth emaiAddress';
          event.target.setCustomValidity(message);
        }
    });
};
  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

        var data = {};
        $(this).serializeArray().forEach(function (item) {
          data[item.name] = item.value;
        });

        fn(data).then(function () {
          this.reset();
          this.elements[0].focus();
        }).bind(this);

    });
  };

  App.FormHandler = FormHandler;

  window.App =  App;
})(window);
