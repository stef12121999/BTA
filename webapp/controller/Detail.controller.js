sap.ui.define(
    [
      "intern2020/controller/BaseController",
      "sap/m/MessageToast",
      'sap/m/Button',
        'sap/m/Dialog',
        'sap/m/Label',
        'sap/m/Text',
        'sap/m/TextArea',
    ],
    function (BaseController, MessageToast,Button, Dialog, Label, Text, TextArea,) {
      "use strict";
      return BaseController.extend("intern2020.controller.Detail", {
        onInit: function (oEvent) {
          this.getOwnerComponent()
          .getRouter()
          .getRoute("detail")
          .attachPatternMatched(this.checkLogin, this);
        },

        checkLogin: function (oEvent) {
          var userInfo = this.getOwnerComponent().getModel("UserInfo").getData();
          if (!userInfo.isManager) {
            jQuery.sap.require("sap.m.MessageBox");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            sap.m.MessageBox.error(
              "You must be logged in if you want to use the application.",
              {
                title: "Log in",
                onClose: function () {
                  oRouter.navTo("login");
                },
                styleClass: "", // default
                actions: sap.m.MessageBox.Action.Close, // default
                emphasizedAction: null, // default
                initialFocus: null, // default
                textDirection: sap.ui.core.TextDirection.Inherit, // default
              }
              
            );
            
          }
          this.requestId = oEvent.getParameter("arguments").sId;
            this.getView().bindElement("/Front_TripSet('" + this.requestId +"')");
        },

        getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onPressAccept(oEvent){
      
          var oModel = this.getView().getModel();
            var oEntry = {};
            var tempStatus = oModel.getData("/Front_TripSet('"+this.requestId+"')").Status;
          if(tempStatus==0)
          {

              oEntry.Status= 1;
              oEntry.DeclineReason="";
              
              oModel.update("/Front_TripSet('"+this.requestId+"')", oEntry, {
                //method: "PUT",
                success: function(oData) {
                  MessageToast.show("Trip accepted successfully!");

                },
                error: function() {
                  MessageToast.show("Error at accepting trip.");

                }
              });

            }
        },

        onPressSubmitDecline(oEvent){
      
         
        },

        onPressDecline(oEvent){
          var dialog = new Dialog({
            title: 'Confirm',
            type: 'Message',
            content: [
              new Label({ text: 'Are you sure you want to submit your shopping cart?', labelFor: 'submitDialogTextarea'}),
              new TextArea('submitDialogTextarea', {
                liveChange: function(oEvent) {
                  var sText = oEvent.getParameter('value');
                  var parent = oEvent.getSource().getParent();
    
                  parent.getBeginButton().setEnabled(sText.length > 0);
                },
                width: '100%',
                placeholder: 'Add note (required)'
              })
            ],
            beginButton: new Button({
              text: 'Submit',
              enabled: false,
              press: function () {
                var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
                var oModel = this.getView().getModel();
                var oEntry = {};
                var tempStatus = oModel.getData("/Front_TripSet('"+this.requestId+"')").Status;

              if(tempStatus==0)
              {
                  oEntry.Status= 2;
                  oEntry.DeclineReason=sText;
                  
                  oModel.update("/Front_TripSet('"+this.requestId+"')", oEntry, {
                    //method: "PUT",
                    success: function(oData) {
                      MessageToast.show("Trip declined successfully!");
    
                    },
                    error: function() {
                      MessageToast.show("Error at declining trip.");
    
                    }
                  });
    
                }
                MessageToast.show('Note is: ' + sText);

                dialog.close();
              }.bind(this)
            }),
            endButton: new Button({
              text: 'Cancel',
              press: function () {
                dialog.close();
              }
            }),
            afterClose: function() {
              dialog.destroy();
            }
          });
    
          dialog.open();
        },

        onGoToLogin: function (oEvent) {    
            var oRouter = this.getRouter();
            oRouter.navTo("manager");
          },

      });
    }
  );
  