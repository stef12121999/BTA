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
        this.alreadyLoaded = false;
        this.getRouter()
          .getRoute("detail")
          .attachPatternMatched(this.patternMatched, this);
      },

      setButtons: function () {
        var status = this.getView()
          .getModel()
          .getData("/Front_TripSet('" + this.requestId + "')").Status;
        console.log(status)

        if (status == 0) {
          this.getView().byId("acceptButton").setVisible(true);
          this.getView().byId("declineButton").setVisible(true);
        } else {
          this.getView().byId("acceptButton").setVisible(false);
          this.getView().byId("declineButton").setVisible(false);
        }

        if (status == 1){
          console.log("here")
          this.getView().byId("declineReason").setVisible(false);
        }

      },

      patternMatched: function (oEvent) {
        this.checkLoginManager();
        this.requestId = oEvent.getParameter("arguments").sId;
        this.getView().bindElement({
          path: "/Front_TripSet('" + this.requestId + "')",
          events: {
            change: this.setButtons.bind(this),
          },
        });
      },

      onGoBack: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("manager");
      },

      onPressAccept(oEvent) {
        var oModel = this.getView().getModel();
        var oEntry = {};
        var tempStatus = oModel.getData(
          "/Front_TripSet('" + this.requestId + "')"
        ).Status;
        //var oBindingContex = this.getView().getBindingContext()
            //oBindingContex.getObject().Status
            //var sPath = oBindingContex.getPath()
        if (tempStatus == 0) {
          oEntry.Status = 1;
          oEntry.DeclineReason = "";

          oModel.update("/Front_TripSet('" + this.requestId + "')", oEntry, { //use sPath
            //method: "PUT",
            success: function (oData) {
              MessageToast.show("Trip accepted successfully!");
            },
            error: function () {
              MessageToast.show("Error at accepting trip.");
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
                      //MessageToast.show("Trip declined successfully!");
                    },
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
