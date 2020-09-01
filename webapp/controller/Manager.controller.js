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

      onSortManager: function (oEvent) {
        var sortBy = this.getIdFromGlobalId(oEvent.getSource().getId());
        var oList = this.byId("idTrips");
        this.sortList(oList, new Sorter(sortBy));
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
        var buttonText;
        var buttonId = oEvent.getSource().getId();
        if (buttonId == "container-login---manager--toBeApprovedButton") {
          buttonText = "To Be Approved";
        }
        if (buttonId == "container-login---manager--approvedButton") {
          buttonText = "Approved";
        }
        if (buttonId == "container-login---manager--declinedButton") {
          buttonText = "Declined";
        }
        var buttonPressed = oEvent.oSource.mProperties.pressed;
        this.statusMap.set(buttonText, buttonPressed);

        this.statusFilter = this.getStatusFilter(this.statusMap);
        this.reFilter();
      },

      onFilterBySearch: function (oEvent) {
        var sQuery = oEvent.getParameter("query");
        this.searchFilter = this.getSearchFilterManager(sQuery);
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
        var oList = this.byId("idTrips");
        this.sortList(oList, null);
      },
    });

    return OverflowToolbarController;
  }
);
