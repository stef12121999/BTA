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
          this.getRouter()
          .getRoute("detail")
          .attachPatternMatched(this.patternMatched, this);
        },

        patternMatched: function (oEvent) {
          this.checkLoginManager();
          var requestId = oEvent.getParameter("arguments").sId;
          console.log("/Front_TripSet('" + requestId +"')");
          this.getView().bindElement("/Front_TripSet('" + requestId +"')");
        },

        onGoBack: function (oEvent) {    
            var oRouter = this.getRouter();
            oRouter.navTo("manager");
          },

      });
    }
  );
  