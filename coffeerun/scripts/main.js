(function (Window) {
  'use strict';

  var App = Window.App;

  var Truck = App.Truck;

  var DataStore = App.DataStore;


  var myTruck = new Truck('ncc-1701', new DataStore());

  Window.myTruck = myTruck;
})(Window);
