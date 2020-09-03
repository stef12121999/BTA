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
    return BaseController.extend("intern2020.controller.ForgotPass", {
      onInit: function (oEvent) {},

      onNavBack: function() {
        this.getRouter().navTo("login");
      },

      onSendEmail: function (oEvent) {

        var oView = this.getView();
        var oModel = oView.getModel();
        var UserId = oView.byId("input-c").getValue();

        oModel.callFunction("/Change_Password", {
          method: "POST",
          urlParameters: {
            UserId: UserId,
          },
          success: function (oData) {
            MessageToast.show(this.getModelText("NewPassword"));
          }.bind(this),
          error: function () {
            MessageToast.show(this.getModelText("IncorrectEmail"));
          }.bind(this),
        });
      },
    });
  }
);
