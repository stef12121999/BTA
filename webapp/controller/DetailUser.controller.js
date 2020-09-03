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
    return BaseController.extend("intern2020.controller.DetailUser", {
      onInit: function (oEvent) {
        this.getRouter()
          .getRoute("detailUser")
          .attachPatternMatched(this.patternMatched, this);
      },

      patternMatched: function (oEvent) {
        this.checkLoginUser();
        var oView = this.getView();
        oView.byId("detailUserPage").setVisible(false);
        this.requestId = oEvent.getParameter("arguments").sId;
        var oModel = oView.getModel();
        var oRouter = this.getRouter();
        oModel.read("/Front_TripSet('" + this.requestId + "')", {
          success: function (oData) {
            if (oData.UId != this.getUsername()) {
              this.showMessageBoxAndGoToLogin("You must be logged in if you want to use the application");
            }
            else {
              oView.byId("detailUserPage").setVisible(true);
              oView.bindElement("/Front_TripSet('" + this.requestId + "')");
            }
          }.bind(this),
          error: function () {
            this.showMessageBoxAndGoToLogin("You must be logged in if you want to use the application");
          }.bind(this),
        });
      },

      onNavBack: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("user");
      },
    });
  }
);
