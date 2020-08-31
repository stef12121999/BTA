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
    return BaseController.extend("intern2020.controller.Login", {
      onInit: function (oEvent) {},
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },

      onValidation: function (oEvent) {
        var oView = this.getView();
        var oModel = oView.getModel();
        var UserId = oView.byId("username").getValue();
        var UserPassword = oView.byId("password").getValue();
        
        if (UserId == "") {
          MessageToast.show("Please Enter Username");
          return false;
        } else if (UserPassword == "") {
          MessageToast.show("Please Enter Password");
          return false;
        } else {
          //var sPath = oModel.createKey("/EmployeeSet", {
          //Id : UserId,
          //Password : UserPassword
          //});
          oModel.read(
            "/EmployeeSet(Id='" + UserId + "',Password='" + UserPassword + "')",

            {
              success: function (oData) {
                var isUser;
                var isManager;
                var username = oData.Id;
                if (oData.IsManager == 1) {
                  var oRouter = this.getRouter();
                  oRouter.navTo("manager");
                  isUser = true;
                  isManager = true;
                } else {
                  var oRouter = this.getRouter();
                  oRouter.navTo("user");
                  isUser = true;
                  isManager = false;
                }
                var data = { isUser: isUser, isManager: isManager, username: username };
                this.getModel("UserInfo").setData(data);
                jQuery.sap.storage.put("UserInfo", data);
              }.bind(this),

              error: function (var1, var2, var3) {
                MessageToast.show("{i18n>InvalidLogin}");
              },
            }
          );
        }
      },

      onForgotPass: function (oEvent) {    
        var oRouter = this.getRouter();
        oRouter.navTo("forgotPass");
      },
      
      onSwitchToEnglish: function() {
        sap.ui.getCore().getConfiguration().setLanguage("en");
      },

      onSwitchToGerman: function() {
        sap.ui.getCore().getConfiguration().setLanguage("de");
      },

      // onSwitchLanguage: function(oEvent){
      //   if(oEvent.getSource().getState() == true)
      //   {
      //     sap.ui.getCore().getConfiguration().setLanguage("de");
      //   }
      //   else
      //   {
      //     sap.ui.getCore().getConfiguration().setLanguage("en");
      //   }
      // }
    });
  }
);