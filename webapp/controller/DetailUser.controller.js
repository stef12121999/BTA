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
    return BaseController.extend("intern2020.controller.DetailUser", {
      onInit: function (oEvent) {
        this.getRouter()
          .getRoute("detailUser")
          .attachPatternMatched(this.patternMatched, this);
      },

      patternMatched: function (oEvent) {
        this.checkLoginUser();
        var oView = this.getView();
        oView.byId("detailUserPage").setVisible(false);
        this.requestId = oEvent.getParameter("arguments").sId;
        var oModel = oView.getModel();
        var oRouter = this.getRouter();
        oModel.read("/Front_TripSet('" + this.requestId + "')", {
          success: function (oData) {
            console.log(oData.UId);
            if (oData.UId != this.getUsername()) {
              console.log("not me");
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.error(
                "You must be logged in if you want to use the application.",
                {
                  title: "Log in",
                  onClose: function () {
                    oRouter.navTo("login");
                  },
                  styleClass: "",
                  actions: sap.m.MessageBox.Action.Close,
                  emphasizedAction: null,
                  initialFocus: null,
                  textDirection: sap.ui.core.TextDirection.Inherit,
                }
              );
            }
            else {
              oView.byId("detailUserPage").setVisible(true);
              oView.bindElement("/Front_TripSet('" + this.requestId + "')");
            }

          }.bind(this),

          error: function () {
            console.log("error");
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.error(
              "You must be logged in if you want to use the application.",
              {
                title: "Log in",
                onClose: function () {
                  oRouter.navTo("login");
                },
                styleClass: "",
                actions: sap.m.MessageBox.Action.Close,
                emphasizedAction: null,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit,
              }
            );
          }.bind(this),
        });
      },

      onGoBack: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("user");
      },
    });
  }
);
