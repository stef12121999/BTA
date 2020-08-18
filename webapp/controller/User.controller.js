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

        this.checkLoginUser();

        var aFilter = [];
        var oFilter = new Filter({
          path: "UId",
          operator: FilterOperator.EQ,
          value1: this.getUsername(),
        });
        aFilter.push(oFilter);

        this.getView()
          .byId("idTrips")
          .bindAggregation("items", {
            path: "/Front_TripSet",
            template: this.getView().byId("tripItem"),
            filters: aFilter,
          });

        // var oView = this.getView();
        // oView.byId("idTrips").getBinding("items").filter(aFilter);
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
        var oRouter = this.getRouter();
        var sID = oEvent.getSource().getBindingContext().getObject().RId;
        oRouter.navTo("detailUser", {
          sId: sID,
        });
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
