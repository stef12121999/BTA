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
      },

      onNavBack: function () {
        this.navBackTo("user");
      },

      onChangePassword: function () {
        var oModel = this.getView().getModel();
        var username = this.getUsername();
        var oView = this.getView();
        var oldPass = oView.byId("inputOld").getValue();
        var newPass = oView.byId("inputNew").getValue();
        var newPassCheck = oView.byId("inputNewCheck").getValue();
        if (newPass!=newPassCheck){
          MessageToast.show(this.getModelText("PasswordNot"));
        }else{
        oModel.update(
          "/EmployeeSet(Id='" + username + "',Password='" + oldPass + "')",
          { Password: newPass },
          {
            success: function () {
              MessageToast.show(this.getModelText("PasswordChanged"));
            }.bind(this),
            error: function () {
              MessageToast.show(this.getModelText("OldPassword"));
            }.bind(this),
          }
        );}
      },

      patternMatched: function (oEvent) {
        this.checkLoginUser();
      },
    });
  }
);
