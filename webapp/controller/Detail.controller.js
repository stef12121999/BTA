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
        onInit: function (oEvent) {},
        getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onGoToLogin: function (oEvent) {
            var data = { isUser: false, isManager: false };
            var oModel = new JSONModel(data);
            var userInfo = this.getOwnerComponent().setModel(oModel, "UserInfo");
    
            var oRouter = this.getRouter();
            oRouter.navTo("manager");
          },

      });
    }
  );
  