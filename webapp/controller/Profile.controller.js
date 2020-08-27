sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/model/json/JSONModel"
  ],
  function (
    BaseController,
    MessageToast,
    Button,
    Dialog,
    Label,
    Text,
    TextArea,
    JSONModel
  ) {
    "use strict";
    return BaseController.extend("intern2020.controller.Profile", {
      onInit: function (oEvent) {
        this.getRouter()
        .getRoute("profile")
        .attachPatternMatched(this.patternMatched, this);
      },

      patternMatched: function () {
        this.checkLoginUser();
        var oModel = this.getOwnerComponent().getModel();

        oModel.callFunction("/Employee_Details", {
          method: "GET",
          urlParameters: {
            UserId: this.getUsername(),
          },
          success: function (oData) {
            this.getOwnerComponent().setModel(new JSONModel(oData), "profile");
          }.bind(this),
          error: function () {
            MessageToast.show(
              "Are you sure that this is your correct email address?"
            );
          },
        });
      },

      onNavBack: function () {
        this.navBackTo("user");
      }
    });
  }
);
