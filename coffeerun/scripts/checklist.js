(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function Checklist(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  Checklist.prototype.addRow = function (coffeeorder) {
    this.removeRow(coffeeorder.emailAddress);
    var rowElement = new Row(coffeeorder);
    this.$element.append(rowElement.$element);
  };

  Checklist.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  Checklist.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (envent) {
      var email = envent.target.value;

      fn(email).then(function () {
        this.removeRow(email);
      }).bind(this);
    }.bind(this));
  };



  function Row(coffeeorder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $lable = $('<lable></lable>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeorder.emailAddress
    });

    var description = coffeeorder.size + ' ';
    if (coffeeorder.flavor) {
      description += coffeeorder.flavor + ' ';
    }

    description += coffeeorder.coffee + ', ';
    description += '(' + coffeeorder.emailAddress + ')';
    description += '[' + coffeeorder.strength + 'x]';

    $lable.append($checkbox);
    $lable.append(description);
    $div.append($lable);

    this.$element = $div;

  }

  App.Checklist = Checklist;
  window.App = App;


})(window);
