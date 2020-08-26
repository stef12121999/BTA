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

    return BaseController.extend("intern2020.controller.Manager", {
      onInit: function (oContext) {
        this.statusMap = this.getInitialStatusMap();

        this.searchFilter = null;
        this.statusFilter = null;

        this.getRouter()
          .getRoute("manager")
          .attachPatternMatched(this.checkLoginManager, this);
      },
/*ONLY ONE FUNCTION : onSort(oEvent) function () {
        var sSortProperty = oEvent.getSource().getId();
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter(sSortProperty));
      },
}*/
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

      onSortByUsername: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("UId"));
      },

      onSortByServiceUnit: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(new Sorter("ServiceUnit"));
      },

      onSortByNothing: function () {
        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.sort(null);
      },

      onGoToYourTrips: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("user");
      },

      onGoToProfile: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("profile");
      },

      onGoToSettings: function (oEvent) {
        var oRouter = this.getRouter();
        oRouter.navTo("changePassword");
      },

      reFilter: function () {
        var filter = this.combineFiltersWithAnd([
          this.statusFilter,
          this.searchFilter,
        ]);

        var oList = this.byId("idTrips");
        var oBinding = oList.getBinding("items");
        oBinding.filter(filter, FilterType.Application);
      },

      onFilterByStatus: function (oEvent) {
        var buttonText = oEvent.oSource.mProperties.text;
        var buttonPressed = oEvent.oSource.mProperties.pressed;
        this.statusMap.set(buttonText, buttonPressed);

        this.statusFilter = this.getStatusFilter(this.statusMap);
        this.reFilter();
      },

      onFilterBySearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        this.searchFilter = this.getSearchFilter(sQuery);
        this.reFilter();
      },

      onPressDetail: function (oEvent) {
        var sID = oEvent.getSource().getBindingContext().getObject().RId;
        var oRouter = this.getRouter();
        oRouter.navTo("detailManager", {
          sId: sID,
        });
      },

      onReset: function () {
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
