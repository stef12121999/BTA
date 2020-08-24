sap.ui.define(
<<<<<<< HEAD
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
            MessageToast.show("Your new password will be sent to you in an email.");
          }.bind(this),
          error: function () {
            MessageToast.show("Are you sure that this is your correct email address?");
          },
        });
      },
    });
  }
);

// userName:user,
=======
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
          console.log("ffffffffff");
            var oView = this.getView();
            var oModel = oView.getModel();
            var UId = oView.byId("input-c").getValue();


            oModel.callFunction("/Change_Password", "POST", {"UserId": UId}, {
                  success: function (oData) {
                    MessageToast.show("Password changed.")
                  }.bind(this),
    
                  error: function () {
                    MessageToast.show("Login Failed");
                  },
                } ) ;

 
            // oModel.callFunction("/Change_Password",{
            //   UserId : UId
            // },
            //   {
            //     success: function (oData) {
            //       MessageToast.show("Password changed.")
            //     }.bind(this),
  
            //     error: function () {
            //       MessageToast.show("Login Failed");
            //     },
            //   }
            // );
        }
  
  
      });
    }
  );
  
  // userName:user,
>>>>>>> alex
//password:''
/*
create function import ("changePassword") - se creeaza in odata
  parameter of function import : username
 
  oModel.callFunction("changePassword",{
    username:'blabla'
  },success: "password has changed")
 
*/
