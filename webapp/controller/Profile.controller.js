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
          var oView = this.getView();
          var oModel = oView.getModel();
          var UserId = oView.byId("").getValue();
  
          oModel.callFunction("/Employee_Details", {
            method: "GET",
            urlParameters: {
              UserId: UserId,
            },
            success: function (oData) {
              
            }.bind(this),
            error: function () {
              MessageToast.show("error occured");
            },
          });
        },
  
        onNavBack : function(oEvent){
          var oRouter = this.getRouter();
          oRouter.navTo("user");
        }
      });
    }
  );
  