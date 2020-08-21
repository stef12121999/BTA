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
        onInit: function (oEvent) {
            
        },
 
        onSendEmail: function(oEvent)
        {
          
            var oView = this.getView();
            var oModel = oView.getModel();
            var UserId = oView.byId("input-c").getValue();
 
            oModel.callFunction("Change_Password",{
              Id : UserId
            },
  
              {
                success: function (oData) {
                  MessageToast.show("Password changed.")
                }.bind(this),
  
                error: function () {
                  MessageToast.show("Login Failed");
                },
              }
            );
        }
  
  
      });
    }
  );
  
  // userName:user,
//password:''
/*
create function import ("changePassword") - se creeaza in odata
  parameter of function import : username
 
  oModel.callFunction("changePassword",{
    username:'blabla'
  },success: "password has changed")
 
*/