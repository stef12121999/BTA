sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/core/routing/History",
  ],
  function (
    BaseController,
    MessageToast,
    Button,
    Dialog,
    Label,
    Text,
    TextArea,
    History
  ) {
    "use strict";
    return BaseController.extend("intern2020.controller.ChangePassword", {
      onInit: function (oEvent) {
        this.getRouter()
          .getRoute("changePassword")
          .attachPatternMatched(this.patternMatched, this);
        this.checkLoginUser(); //should not be called here and also in patternMatched (just in patternMatched) difference between: attchPatternMatched/attachMatched/attachRouteMatch
      },

      onNavBack: function () {
        //this.onNavBack("user")->call function from base controoler
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getRouter();
          oRouter.navTo("user", true);
        }
      },

      onChangePassword: function () {
        var oModel = this.getView().getModel();
        var username = this.getUsername();
        var oView = this.getView();
        var oldPass = oView.byId("inputOld").getValue();
        var newPass = oView.byId("inputNew").getValue();
        oModel.update(
          "/EmployeeSet(Id='" + username + "',Password='" + oldPass + "')",
          { Password: newPass },
          {
            success: function () {
              MessageToast.show("Your password was changed.");
            },
            error: function () {
              MessageToast.show("Old password is incorrect.");
            },
          }
        );
      },

      patternMatched: function (oEvent) {
        this.checkLoginUser();
      },
    });
  }
);
