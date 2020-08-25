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
    "sap/m/MessageBox"
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
    MessageBox
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
        /* =========================================================== */
        /* Getter functions                                            */
        /* =========================================================== */

        /* =========================================================== */
        /* Helper functions */
        /* =========================================================== */

        /**
         * Get router for current view
         * @returns {sap.m.routing.Router} router object
         * @memberOf porsche.pbs.controller.BaseController
         */
        getRouter: function () {
          // return the Router for the current view
          return sap.ui.core.UIComponent.getRouterFor(this);
        },
        /**
         * Getter for the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         */
        getResourceBundle: function () {
          return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getModel: function (sText) {
          return this.getView().getModel(sText);
        },

        recoverSession: function () {
          var data = jQuery.sap.storage.get("UserInfo");
          var oModel = new JSONModel(data);
     //     this.getOwnerComponent().setModel(oModel, "UserInfo");
     //no need for this.getOwnerComponent()  -> this.getModel()
        },

        logOut: function () {
          var data = { isUser: false, isManager: false, username: null };
      //    var oModel = new JSONModel(data);
     //     this.getOwnerComponent().setModel(oModel, "UserInfo");
    //another method: this.getModel("UserInfo").setData(data);
            this.getModel("UserInfo").setProperty("isUser",false);
            this.getModel("UserInfo").setProperty("isManager",false);
            this.getModel("UserInfo").setProperty("username",null);
          jQuery.sap.storage.put("UserInfo", data);
        },

        checkLoginUser: function () {
          this.recoverSession();
          var userInfo = this.getOwnerComponent()
            .getModel("UserInfo")
            .getData();
          if (!userInfo.isUser) {
            this.showMessageBoxAndGoToLogin(
              "You must be logged in if you want to use the application"
            );
          }
        },

        getUsername: function () {
          var userInfo = this.getOwnerComponent()
            .getModel("UserInfo")
            .getData();
          var username = userInfo.username;
          return username;
        },

        showMessageBoxAndGoToLogin: function (message) {
      //    jQuery.sap.require("sap.m.MessageBox");
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
          var userInfo = this.getOwnerComponent()
            .getModel("UserInfo")
            .getData();
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

        getSearchFilter: function (text) {
          var searchFilters = [];
          if (text != null && text.length > 0) {
            searchFilters.push(new Filter("Country", FilterOperator.Contains, text));
            searchFilters.push(new Filter("UId", FilterOperator.Contains, text));
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
        }
      }
    );

    return oBaseController;
  }
);
