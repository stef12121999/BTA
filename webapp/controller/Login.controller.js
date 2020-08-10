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