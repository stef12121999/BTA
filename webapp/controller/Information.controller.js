sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, MessageToast, JSONModel, ResourceModel, Fragment) {
    "use strict";
    return BaseController.extend("intern2020.controller.Information", {
      getDay: function (number) {
        switch (number) {
          case 0:
            return "Monday";
          case 1:
            return "Tueday";
          case 2:
            return "Wednesday";
          case 3:
            return "Thursday";
          case 4:
            return "Friday";
          case 5:
            return "Saturday";
          case 6:
            return "Sunday";
        }
      },

      loadForecast: function (t, latitude, longitude) {
        var view = t.getView();

        var url =
          "https://api.openweathermap.org/data/2.5/onecall?" +
          "lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&exclude=hourly,minutely&appid=764f9357def1ccb41474b27a925b7a35";

        var getDay = t.getDay;

        $.ajax({
          url: url,
          dataType: "text",
          type: "GET",
          success: function (data, textStatus, jqXHR) {
            var obj = JSON.parse(data);
            for (var i = 0; i < 7; i++) {
              var vBoxDay = new sap.m.VBox({ alignItems: "Center" });

              var date = new Date(obj.daily[i].dt * 1000);
              var dateString =
                date.getDate() +
                ". " +
                (parseInt(date.getMonth()) + 1).toString() +
                ". " +
                date.getFullYear() +
                ". ";
              var dateLabel = new sap.m.Label({ text: dateString });
              var dayLabel = new sap.m.Label({ text: getDay(date.getDay()) });

              var iconLink =
                "http://openweathermap.org/img/w/" +
                obj.daily[i].weather[0].icon +
                ".png";
              var icon = new sap.m.Image({ src: iconLink });

              var temperatureString =
                (parseFloat(obj.daily[i].temp.max) - 273.15).toFixed(1) +
                "°   " +
                (parseFloat(obj.daily[i].temp.min) - 273.15).toFixed(1) +
                "°";
              var temperatureLabel = new sap.m.Label({
                text: temperatureString,
              });

              vBoxDay.addItem(dayLabel);
              vBoxDay.addItem(dateLabel);
              vBoxDay.addItem(icon);
              vBoxDay.addItem(temperatureLabel);
              vBoxDay.setWidth("5.5rem");
              vBoxDay.addStyleClass("sapUiMediumMarginBottom");
              view.byId("forecast").addItem(vBoxDay);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {

            var errorLabel = new sap.m.Label({
              text:
                "Are you sure that those are the correct coordinates? No such location was found.",
            });
            view.byId("forecast").addItem(errorLabel);
          },
        });
      },

      onInit: function (oEvent) {
        this.getRouter()
        .getRoute("information")
        .attachPatternMatched(this.patternMatched, this);
      },

      patternMatched: function () {
        this.checkLoginUser();
      },

      onNavBack: function() {
        this.navBackTo("user");
      },

      onGetInfoByCoordinates: function (oEvent) {
        this.getView().byId("foundPlace").setText("");
        this.getView().byId("place").setValue("");
        this.getView().byId("forecast").removeAllItems();
        var latitude = parseFloat(this.getView().byId("latitude").getValue());
        var longitude = parseFloat(this.getView().byId("longitude").getValue());
        this.loadForecast(this, latitude, longitude);
      },

      onGetInfo: function (oEvent) {
        this.getView().byId("foundPlace").setText("");
        this.getView().byId("latitude").setValue("");
        this.getView().byId("longitude").setValue("");
        var place = this.getView().byId("place").getValue();
        var view = this.getView();
        var url =
          "https://nominatim.openstreetmap.org/search?q=" +
          place +
          "&format=json";
        this.getView().byId("forecast").removeAllItems();
        var loadForecast = this.loadForecast;
        var t = this;
        $.ajax({
          url: url,
          dataType: "text",
          type: "GET",
          success: function (data, textStatus, jqXHR) {
            var obj = JSON.parse(data);
            if (obj[0] == null) {
              var errorLabel = new sap.m.Label({
                text:
                  "No such location was found. Try searching with different keywords.",
              });
              view.byId("forecast").addItem(errorLabel);
            } else {
              view
                .byId("foundPlace")
                .setText("We have found this place: " + obj[0].display_name);
              view.byId("latitude").setValue(obj[0].lat);
              view.byId("longitude").setValue(obj[0].lon);
              loadForecast(t, parseFloat(obj[0].lat), parseFloat(obj[0].lon));
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
            var errorLabel = new sap.m.Label({
              text:
                "No such location was found. Try searching with different keywords.",
            });
          },
        });
      },
    });
  }
);
