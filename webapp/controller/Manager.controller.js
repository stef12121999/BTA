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
    onSortByTotalPrice: function() {
      var oList = this.byId("idTrips");
      var oBinding = oList.getBinding("items");
      oBinding.sort(new Sorter("Total"));
    },

    onSortByStatus: function(){
      var oList = this.byId("idTrips");
      var oBinding = oList.getBinding("items");
      oBinding.sort(new Sorter("Status"));
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

      onGoToLogin: function (oEvent) {
        this.logOut();
        var oRouter = this.getRouter();
        oRouter.navTo("login");
      },

      onNavBack: function () {
        /*var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {*/
          this.onGoToLogin();
        //}
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

      onReset: function (oEvent) {
        var oTable = this.getView().byId("idTrips");
        oTable.getBinding("items").sort(null);
        this._resetSortingState();
      },

      onGroup: function (oEvent) {
        this.bGrouped = !this.bGrouped;
        this.fnApplyFiltersAndOrdering();
      },
      onID: function (oEvent) {
        var oTable = this.getView().byId("idTrips");
        var oItems = oTable.getBinding("items"); // get the table's odata source binding for rows
        var oBindingPath = oEvent.getSource().getBindingContext().sPath; // get the sPath related to column clicked
        var bDescending = false;
        var oSorter = new sap.ui.model.Sorter(oBindingPath, bDescending); //create a new sorter for your model based on the column clicked.
        oItems.sort(oSorter); // push the sorter to your model's binding
      },

      onSort: function (oEvent) {
        var oTable = this.getView().byId("idTrips");
        var oItems = oTable.getBinding("items"); // get the table's odata source binding for rows
        var oBindingPath = oEvent.getSource().getBindingContext().contry; // get the sPath related to column clicked
        var bDescending = false;
        var oSorter = new sap.ui.model.Sorter(oBindingPath, bDescending); //create a new sorter for your model based on the column clicked.
        oItems.sort(oSorter); // push the sorter to your model's binding
      },

      onFilter: function (oEvent) {
        this.sSearchQuery = oEvent.getSource().getValue();
        this.fnApplyFiltersAndOrdering();
      },

      fnApplyFiltersAndOrdering: function (oEvent) {
        var aFilters = [],
          aSorters = [];

        if (this.bGrouped) {
          aSorters.push(new Sorter("UId", this.bDescending, this._fnGroup));
        } else {
          aSorters.push(new Sorter("Country", this.bDescending));
        }

        if (this.sSearchQuery) {
          var oFilter = new Filter(
            "RId",
            FilterOperator.Contains,
            this.sSearchQuery
          );
          aFilters.push(oFilter);
        }

        this.byId("idTrips")
          .getBinding("items")
          .filter(aFilters)
          .sort(aSorters);
      },
    });

    return OverflowToolbarController;
  }
);
