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
            return this.getModelText("Monday");
          case 1:
            return this.getModelText("Tueday");
          case 2:
            return this.getModelText("Wednesday");
          case 3:
            return this.getModelText("Thursday");
          case 4:
            return this.getModelText("Friday");
          case 5:
            return this.getModelText("Saturday");
          case 6:
            return this.getModelText("Sunday");
        }
      },

      loadForecast: function (latitude, longitude) {
        var view = this.getView();

        var url =
          "https://api.openweathermap.org/data/2.5/onecall?" +
          "lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&exclude=hourly,minutely&appid=764f9357def1ccb41474b27a925b7a35";

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
              var dayLabel = new sap.m.Label({ text: this.getDay(date.getDay()) });

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
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {

            var errorLabel = new sap.m.Label({
              text:
              this.getModelText("IncorrectCoordinates"),
            });
            view.byId("forecast").addItem(errorLabel);
          }.bind(this),
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
        this.loadForecast(latitude, longitude);
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
                this.getModelText("NoLocation"),
              });
              view.byId("forecast").addItem(errorLabel);
            } else {
              view
                .byId("foundPlace")
                .setText(this.getModelText("FoundPlace") + " " + obj[0].display_name);
              view.byId("latitude").setValue(obj[0].lat);
              view.byId("longitude").setValue(obj[0].lon);
              this.loadForecast(parseFloat(obj[0].lat), parseFloat(obj[0].lon));
            }
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {
            var errorLabel = new sap.m.Label({
              text: this.getModelText("NoLocation"),
            });
          },
        });
      },
    });
  }
);
