(function (window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;

    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var Checklist = App.Checklist;

    var formHandler = new FormHandler(FORM_SELECTOR);
    var checkList =  new Checklist(CHECKLIST_SELECTOR);
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', remoteDS);


    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    formHandler.addSubmitHandler(function (data) {
     return  myTruck.createOrder.call(myTruck, data).then(function () {
        checkList.addRow.call(checkList, data);
      }, function () {
        alert('error----try again');
      });
    });
    formHandler.addInputHandler(Validation.isCompanyEmail);
    console.log(formHandler);
    myTruck.printOrders(checkList.addRow.bind(checkList));

    window.myTruck = myTruck;

})(window);
