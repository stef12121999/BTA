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
  ],
  function (
    BaseController,
    Filter,
    FilterOperator,
    Sorter,
    JSONModel,
    ResourceModel,
    MessageToast,
    FilterType
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

      onGoToLogin: function (oEvent) {
        this.logOut();
        var oRouter = this.getRouter();
        oRouter.navTo("login");
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
        oRouter.navTo("detail", {
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
