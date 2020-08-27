sap.ui.define(
  [
    "intern2020/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast",
    "sap/ui/model/FilterType",
    "sap/ui/core/routing/History",
  ],
  function (
    BaseController,
    Filter,
    FilterOperator,
    Sorter,
    JSONModel,
    ResourceModel,
    MessageToast,
    FilterType,
    History
  ) {
    "use strict";

    return BaseController.extend("intern2020.controller.User", {
      onInit: function () {
        this.getRouter()
          .getRoute("user")
          .attachPatternMatched(this.patternMatched, this);
      },

      patternMatched: function () {
        this.getView().byId("idTrips").setVisible(false);
        this.checkLoginUser();

        this.countLoad = 0;
        this.userFilter = new Filter({
          path: "UId",
          operator: FilterOperator.EQ,
          value1: this.getUsername(),
        });

        this.statusMap = this.getInitialStatusMap();
        this.searchFilter = null;
        this.statusFilter = null;

        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        if (oBinding != null) {
          oBinding.refresh();
        }
      },

      onGoToAllTrips: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("manager");
      },

      onGoToProfile: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("profile");
      },

      onGoToSettings: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("changePassword");
      },

      onGoToPlanTrip: function() {
        var oRouter = this.getRouter();
        oRouter.navTo("information")
      },

      onSortByDate: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("StartDate"));
      },

      onSortByCountry: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("Country"));
      },

      onSortByCity: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("City"));
      },

      onSortByTotalCost: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("Total"));
      },

      onSortByNothing: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(null);
      },

      onDataReceived: function () {
        if (this.countLoad == 0) {
          var oList = this.byId("idTrips");
          var oBinding = oList.getBinding("items");
          oBinding.filter(this.userFilter, FilterType.Application);
          this.countLoad += 1;
        }
        if (this.countLoad == 1) {
          oList.setVisible(true);
          this.countLoad += 1;
        }
      },

      reFilter: function () {
        var filter = this.combineFiltersWithAnd([
          this.statusFilter,
          this.searchFilter,
          this.userFilter,
        ]);
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.filter(filter, FilterType.Application);
      },

      onFilterBySearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        this.searchFilter = this.getSearchFilterUser(sQuery);
        this.reFilter();
      },

      onFilterByStatus: function (oEvent) {
        var buttonText = oEvent.oSource.mProperties.text;
        console.log(buttonText);
        var buttonPressed = oEvent.oSource.mProperties.pressed;
        this.statusMap.set(buttonText, buttonPressed);

        this.statusFilter = this.getStatusFilter(this.statusMap);
        this.reFilter();
      },

      onPressDetail: function (oEvent) {
        var oRouter = this.getRouter();
        var sID = oEvent.getSource().getBindingContext().getObject().RId;
        oRouter.navTo("detailUser", {
          sId: sID,
        });
      },

      onReset: function () {
        this.statusMap = this.getInitialStatusMap();
        this.searchFilter = null;
        this.statusFilter = null;
        this.reFilter();
        this.getView().byId("approvedButton").setPressed(false);
        this.getView().byId("toBeApprovedButton").setPressed(false);
        this.getView().byId("declinedButton").setPressed(false);
        this.getView().byId("searchField").setValue("");
        this.onSortByNothing();
      },
    });

    return OverflowToolbarController;
  }
);
