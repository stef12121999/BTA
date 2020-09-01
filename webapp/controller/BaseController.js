sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
  ],
  function (
    Controller,
    Filter,
    FilterOperator,
    History,
    Button,
    Dialog,
    Text,
    NumberFormat,
    JSONModel,
    MessageBox,
    Sorter
  ) {
    // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * BaseController.js
     *
     * General Base controller which is extended by all other controllers.
     * Used to provide global functions that can be reused throughout the application
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class BaseController.js
     *
     * @constructor
     * @public
     * @aliasintern2020.BaseController
     */
    var oBaseController = Controller.extend(
      "intern2020.controller.BaseController",
      {
        getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        getResourceBundle: function () {
          return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getModel: function (sText) {
          return this.getOwnerComponent().getModel(sText);
        },

        recoverSession: function () {
          var data = jQuery.sap.storage.get("UserInfo");
          var oModel = new JSONModel(data);
          var language = jQuery.sap.storage.get("language");
          //console.log(language);
          if (language != null) {
            sap.ui.getCore().getConfiguration().setLanguage(language);
          }
          this.getOwnerComponent().setModel(oModel, "UserInfo");
        },

        goToLoginAndLogOut: function () {
          this.logOut();
          this.getRouter().navTo("login");
        },

        sortList: function (oList, sorter) {
          var oBinding = oList.getBinding("items");
          oBinding.sort(sorter);
        },

        getIdFromGlobalId: function (globalId) {
          var array = globalId.split("--");
          return array[array.length - 1];
        },

        onGoToPage: function (oEvent) {
          var page = this.getIdFromGlobalId(oEvent.getSource().getId());
          this.getRouter().navTo(page);
        },

        navBackTo: function (defaultPage) {
          var oHistory = History.getInstance();
          var sPreviousHash = oHistory.getPreviousHash();
          if (sPreviousHash !== undefined) {
            window.history.go(-1);
          } else {
            var oRouter = this.getRouter();
            oRouter.navTo(defaultPage, true);
          }
        },

        logOut: function () {
          var data = { isUser: false, isManager: false, username: null };
         var oModel = new JSONModel(data);
         this.getModel("UserInfo").setData(data);
          jQuery.sap.storage.put("UserInfo", data);
        },

        checkLoginUser: function () {
          this.recoverSession();
          var userInfo = this.getModel("UserInfo").getData();
          if (!userInfo.isUser) {
            this.showMessageBoxAndGoToLogin(
              "You must be logged in if you want to use the application"
            );
          }
        },

        getUsername: function () {
          var userInfo = this.getModel("UserInfo").getData();
          var username = userInfo.username;
          return username;
        },

        showMessageBoxAndGoToLogin: function (message) {
          var oRouter = this.getRouter();
          sap.m.MessageBox.error(message, {
            title: "Log in",
            onClose: function () {
              oRouter.navTo("login");
            },
            styleClass: "",
            actions: sap.m.MessageBox.Action.Close,
            emphasizedAction: null,
            initialFocus: null,
            textDirection: sap.ui.core.TextDirection.Inherit,
          });

          // variabila.addStyleClass("");
        },

        checkLoginManager: function () {
          this.recoverSession();
          var userInfo = this.getModel("UserInfo").getData();
          if (!userInfo.isManager) {
            this.showMessageBoxAndGoToLogin(
              "You must be logged in if you want to use the application"
            );
          }
        },

        combineFiltersWithAnd: function (filters) {
          var nonNullFilters = [];
          filters.forEach(function (value, index, array) {
            if (filters[index] != null) {
              nonNullFilters.push(filters[index]);
            }
          });
          return new Filter({
            filters: nonNullFilters,
            and: true,
          });
        },

        getInitialStatusMap: function () {
          var statusMap = new Map();
          statusMap.set("Approved", false);
          statusMap.set("To Be Approved", false);
          statusMap.set("Declined", false);
          return statusMap;
        },

        getSearchFilterUser: function (text) {
          var searchFilters = [];
          if (text != null && text.length > 0) {
            searchFilters.push(new Filter("Country", FilterOperator.Contains, text));
            searchFilters.push(new Filter("City", FilterOperator.Contains, text));
            return new Filter({
              filters: searchFilters,
              and: false,
            });
          }
          return null;
        },

        getSearchFilterManager: function (text) {
          var searchFilters = [];
          if (text != null && text.length > 0) {
            searchFilters.push(new Filter("ServiceUnit", FilterOperator.Contains, text));
            searchFilters.push(new Filter("UId", FilterOperator.Contains, text));
            searchFilters.push(new Filter("Country", FilterOperator.Contains, text));
            return new Filter({
              filters: searchFilters,
              and: false,
            });
          }
          return null;
        },

        getStatusFilter: function (statusMap) {
          var statusFilters = [];
          if (statusMap.get("Approved")) {
            statusFilters.push(
              new Filter({
                path: "Status",
                operator: FilterOperator.EQ,
                value1: "1",
              })
            );
          }
          if (statusMap.get("To Be Approved")) {
            statusFilters.push(
              new Filter({
                path: "Status",
                operator: FilterOperator.EQ,
                value1: "0",
              })
            );
          }
          if (statusMap.get("Declined")) {
            statusFilters.push(
              new Filter({
                path: "Status",
                operator: FilterOperator.EQ,
                value1: "2",
              })
            );
          }
          if (statusFilters.length != 0) {
            return new Filter({
              filters: statusFilters,
              and: false,
            });
          }
          return null;
        },

        getModelText: function(key) {
          return this.getModel("i18n").getResourceBundle().getText(key);
        }
      },
    );

    return oBaseController;
  }
);
