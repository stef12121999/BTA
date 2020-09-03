sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/TextArea",
    "sap/ui/core/BusyIndicator",
  ],
  function (
    BaseController,
    MessageToast,
    Button,
    Dialog,
    Label,
    TextArea,
    BusyIndicator
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
          path: "/Front_TripSet('" + this.requestId + "')",
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
        var dialog = new Dialog({
          title: this.getModelText("Confirm"),
          type: "Message",
          content: [
            new Label({
              text: this.getModelText("AcceptQuestion"),
            }),
          ],
          beginButton: new Button({
            text: this.getModelText("Ok"),
            press: function () {
              BusyIndicator.show();

              var oModel = this.getView().getModel();
              var oEntry = {};
              var tempStatus = this.getView().getBindingContext().getObject()
                .Status;

              oEntry.Status = 1;
              oEntry.DeclineReason = "";

              oModel.update(
                "/Front_TripSet('" + this.requestId + "')",
                oEntry,
                {
                  success: function (oData) {
                    this.refresh();
                    BusyIndicator.hide();
                  }.bind(this),
                  error: function () {
                    BusyIndicator.hide();
                  },
                }
              );
              dialog.close();
            }.bind(this),
          }),
          endButton: new Button({
            text: this.getModelText("Cancel"),
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

      onPressDecline(oEvent) {
        var dialog = new Dialog({
          title: this.getModelText("Confirm"),
          type: "Message",
          content: [
            new Label({
              text: this.getModelText("DeclineQuestion"),
              labelFor: "submitDialogTextarea",
            }),
            new TextArea("submitDialogTextarea", {
              liveChange: function (oEvent) {
                var sText = oEvent.getParameter("value");
                var parent = oEvent.getSource().getParent();

                parent.getBeginButton().setEnabled(sText.length > 0);
              },
              width: "100%",
              placeholder: this.getModelText("AddNote"),
            }),
          ],
          beginButton: new Button({
            text: this.getModelText("Submit"),
            enabled: false,
            press: function () {
              BusyIndicator.show();
              var sText = sap.ui
                .getCore()
                .byId("submitDialogTextarea")
                .getValue();
              var oModel = this.getView().getModel();
              var oEntry = {};
              var tempStatus = this.getView().getBindingContext().getObject()
                .Status;

              if (tempStatus == 0) {
                oEntry.Status = 2;
                oEntry.DeclineReason = sText;

                oModel.update(
                  "/Front_TripSet('" + this.requestId + "')",
                  oEntry,
                  {
                    success: function (oData) {
                      this.refresh();
                      BusyIndicator.hide();
                    }.bind(this),
                    error: function () {
                      BusyIndicator.hide();
                    },
                  }
                );
              }
              dialog.close();
            }.bind(this),
          }),
          endButton: new Button({
            text: this.getModelText("Cancel"),
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
