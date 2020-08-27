sap.ui.define(
    [
      "intern2020/controller/BaseController",
      "sap/m/MessageToast",
      "sap/m/Button",
      "sap/m/Dialog",
      "sap/m/Label",
      "sap/m/Text",
      "sap/m/TextArea",
    ],
    function (
      BaseController,
      MessageToast,
      Button,
      Dialog,
      Label,
      Text,
      TextArea
    ) {
      "use strict";
      return BaseController.extend("intern2020.controller.Profile", {
        onInit: function (oEvent) {
          
        },
  
        onNavBack : function(oEvent){
          var oRouter = this.getRouter();
          oRouter.navTo("user");
        }
      });
    }
  );
  