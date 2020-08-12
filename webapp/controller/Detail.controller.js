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
      return BaseController.extend("intern2020.controller.Detail", {
        onInit: function (oEvent) {
          this.getOwnerComponent()
          .getRouter()
          .getRoute("detail")
          .attachPatternMatched(this.checkLogin, this);
        },

        checkLogin: function () {
          var userInfo = this.getOwnerComponent().getModel("UserInfo").getData();
          console.log(userInfo);
          if (!userInfo.isManager) {
            jQuery.sap.require("sap.m.MessageBox");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            console.log("error message");
            sap.m.MessageBox.error(
              "You must be logged in if you want to use the application.",
              {
                title: "Log in",
                onClose: function () {
                  oRouter.navTo("login");
                },
                styleClass: "", // default
                actions: sap.m.MessageBox.Action.Close, // default
                emphasizedAction: null, // default
                initialFocus: null, // default
                textDirection: sap.ui.core.TextDirection.Inherit, // default
              }
            );
          }
        },

        getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onGoToLogin: function (oEvent) {    
            var oRouter = this.getRouter();
            oRouter.navTo("manager");
          },

      });
    }
  );
  