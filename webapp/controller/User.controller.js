sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast",
  ],
  function (
    BaseController,
    Filter,
    FilterOperator,
    Sorter,
    JSONModel,
    ResourceModel,
    MessageToast
  ) {
    "use strict";

    return BaseController.extend("intern2020.controller.User", {
      onInit: function () {
        this.getRouter()
          .getRoute("user")
          .attachPatternMatched(this.checkLoginUser, this);
      },

      onSliderMoved: function (oEvent) {
        var iValue = oEvent.getParameter("value");
        this.byId("otbSubheader").setWidth(iValue + "%");
        this.byId("otbFooter").setWidth(iValue + "%");
      },

      _fnGroup: function (oContext) {
        var UserId = oContext.getProperty("UId");
        return {
          key: UserId,
          text: UserId,
        };
      },

      onGoToLogin: function (oEvent) {
        this.logOut();
        var oRouter = this.getRouter();
        oRouter.navTo("login");
      },

      onPressDetail: function (oEvent) {
        console.log("detail");
        var oRouter = this.getRouter();
        var sID = oEvent.getSource().getBindingContext().getObject().RId;
        oRouter.navTo("detailUser", {
          sId: sID, 
        });
      },

      onReset: function (oEvent) {
        this.bGrouped = false;
        this.bDescending = false;
        this.sSearchQuery = 0;
        this.byId("UId").setValue("");
        this.fnApplyFiltersAndOrdering();
      },

      onGroup: function (oEvent) {
        this.bGrouped = !this.bGrouped;
        this.fnApplyFiltersAndOrdering();
      },

      onSort: function (oEvent) {
        this.bDescending = !this.bDescending;
        this.fnApplyFiltersAndOrdering();
      },

      onFilter: function (oEvent) {
        this.sSearchQuery = oEvent.getSource().getValue();
        this.fnApplyFiltersAndOrdering();
      },

      onTogglePress: function (oEvent) {
        var oButton = oEvent.getSource(),
          bPressedState = oButton.getPressed(),
          sStateToDisplay = bPressedState ? "Pressed" : "Unpressed";

        MessageToast.show(oButton.getId() + " " + sStateToDisplay);
      },
    });

    return OverflowToolbarController;
  }
);
