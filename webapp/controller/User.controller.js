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
    FilterType,
  ) {
    "use strict";

    return BaseController.extend("intern2020.controller.User", {
      onInit: function () {
        this.getRouter()
          .getRoute("user")
          .attachPatternMatched(this.checkLoginUser, this);
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

        // this.getView()
        //   .byId("idTrips")
        //   .bindAggregation("items", {
        //     path: "/Front_TripSet",
        //     template: this.getView().byId("tripItem"),
        //     filters: [this.userFilter],
        //   });
      },

      onSortByDate: function() {
        var oList = this.byId("idTrips");
          var oBinding = oList.getBinding("items");
          oBinding.sort(new Sorter("StartDate"));
      },

      onSortByCountry: function() {
        var oList = this.byId("idTrips");
          var oBinding = oList.getBinding("items");
          oBinding.sort(new Sorter("Country"));
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
        this.searchFilter = this.getSearchFilter(sQuery);
        this.reFilter();
      },

      onFilterByStatus: function (oEvent) {
        var buttonText = oEvent.oSource.mProperties.text;
        var buttonPressed = oEvent.oSource.mProperties.pressed;
        this.statusMap.set(buttonText, buttonPressed);

        this.statusFilter = this.getStatusFilter(this.statusMap);
        this.reFilter();
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
