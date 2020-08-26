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
      return BaseController.extend("intern2020.controller.Detail", {
        onInit: function (oEvent) {
          this.getRouter()
            .getRoute("detailManager")
            .attachPatternMatched(this.patternMatched, this);
        },
  
        patternMatched: function (oEvent) {
          this.checkLoginManager();
          this.requestId = oEvent.getParameter("arguments").sId;
          this.getView().bindElement({
            path: "/Front_TripSet('" + this.requestId + "')"
          });
        },
  
        onNavBack: function (oEvent) {
          var oRouter = this.getRouter();
          oRouter.navTo("manager");
        },

        refresh: function () {
          this.getView().getModel().refresh();
        },
  
        onPressAccept(oEvent) {
          var oModel = this.getView().getModel();
          var oEntry = {};
          var tempStatus = oModel.getData(
            "/Front_TripSet('" + this.requestId + "')"
          ).Status;
          if (tempStatus == 0) {
            oEntry.Status = 1;
            oEntry.DeclineReason = "";
  
            oModel.update("/Front_TripSet('" + this.requestId + "')", oEntry, {
              //method: "PUT",
              success: function (oData) {
                this.refresh();
                //MessageToast.show("Trip accepted successfully!");
              }.bind(this),
              error: function () {
                //MessageToast.show("Error at accepting trip.");
              },
            });
          }
        },
  
        onPressDecline(oEvent) {
          var dialog = new Dialog({
            title: "Confirm",
            type: "Message",
            content: [
              new Label({
                text: "Why is this trip declined?",
                labelFor: "submitDialogTextarea",
              }),
              new TextArea("submitDialogTextarea", {
                liveChange: function (oEvent) {
                  var sText = oEvent.getParameter("value");
                  var parent = oEvent.getSource().getParent();
  
                  parent.getBeginButton().setEnabled(sText.length > 0);
                },
                width: "100%",
                placeholder: "Add note (required)",
              }),
            ],
            beginButton: new Button({
              text: "Submit",
              enabled: false,
              press: function () {
                var sText = sap.ui
                  .getCore()
                  .byId("submitDialogTextarea")
                  .getValue();
                var oModel = this.getView().getModel();
                var oEntry = {};
                var tempStatus = oModel.getData(
                  "/Front_TripSet('" + this.requestId + "')"
                ).Status;
  
                if (tempStatus == 0) {
                  oEntry.Status = 2;
                  oEntry.DeclineReason = sText;
  
                  oModel.update(
                    "/Front_TripSet('" + this.requestId + "')",
                    oEntry,
                    {
                      //method: "PUT",
                      success: function (oData) {
                        this.refresh();
                        //MessageToast.show("Trip declined successfully!");
                      }.bind(this),
                      error: function () {
                        //MessageToast.show("Error at declining trip.");
                      },
                    }
                  );
                }
                //MessageToast.show("Note is: " + sText);
  
                dialog.close();
              }.bind(this),
            }),
            endButton: new Button({
              text: "Cancel",
              press: function () {
                dialog.close();
              },
            }),
            afterClose: function () {
              dialog.destroy();
            },
          });
  
          dialog.open();
        },
      });
    }
  );