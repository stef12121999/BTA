<<<<<<< HEAD
sap.ui.define([
   "intern2020/controller/BaseController",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/core/Fragment"
], function (BaseController, MessageToast,JSONModel,ResourceModel, Fragment) {
   "use strict";
   return BaseController.extend("intern2020.controller.Login", {

       onInit : function (oEvent) {
            
       },
       
       onValidation: function(oEvent) {

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

               oModel.read("/EmployeeSet(Id='"+UserId+"',Password='"+UserPassword+"')", 
    
           {
               success : function(oData){
                   
                   
                   if(oData.IsManager == 1){
                   var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                   oRouter.navTo("manger");
                }
                       else
                    MessageToast.show("Success user");

               }.bind(this),
               error : function(){
                   MessageToast.show("Login Failed");

               }
           });
               
               
           }
       }
      
   });
});
=======
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
                if (oData.IsManager == 1) {
                  var oRouter = this.getRouter();
                  oRouter.navTo("manager");
                  //MessageToast.show("Success manager");

                  
                  var data = { isUser: true, isManager: true };
                  var oModel = new JSONModel(data);
                  var userInfo = this.getOwnerComponent().setModel(
                    oModel,
                    "UserInfo"
                  );
                } else {
                  var oRouter = this.getRouter();
                  oRouter.navTo("user");
                  //MessageToast.show("Success user");

                  var data = { isUser: true, isManager: false };
                  var oModel = new JSONModel(data);
                  var userInfo = this.getOwnerComponent().setModel(
                    oModel,
                    "UserInfo"
                  );
                }
              }.bind(this),

              error: function () {
                MessageToast.show("Login Failed");
              },
            }
          );
        }
      },
    });
  }
);
>>>>>>> b0cfad50a50dfbc5507cc7df81fd74bd801b7014
