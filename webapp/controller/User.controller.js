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

      onSortUser: function (oEvent) {
        var sortBy = this.getIdFromGlobalId(oEvent.getSource().getId());
        var oList = this.byId("idTrips");
        this.sortList(oList, new Sorter(sortBy));
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
        var buttonText;
        var buttonId = oEvent.getSource().getId();
        if (buttonId == "container-login---user--toBeApprovedButton") {
          buttonText = "To Be Approved";
        }
        if (buttonId == "container-login---user--approvedButton") {
          buttonText = "Approved";
        }
        if (buttonId == "container-login---user--declinedButton") {
          buttonText = "Declined";
        }
        var buttonPressed = oEvent.oSource.mProperties.pressed;
        this.statusMap.set(buttonText, buttonPressed);

        this.statusFilter = this.getStatusFilter(this.statusMap);
        this.reFilter();
      },

      goToManager: function () {
        var oRouter = this.getRouter();
        oRouter.navTo("manager");
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
        var oList = this.byId("idTrips");
        this.sortList(oList, null);
      },
    });

    return OverflowToolbarController;
  }
);
