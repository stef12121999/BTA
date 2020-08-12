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

    return BaseController.extend("intern2020.controller.Manager", {
      onInit: function (oContext) {
        //var UserId = oContext.getProperty("UId");
        //if (typeof(Storage) !== "undefined") {
        // Store
        //localStorage.setItem("lastname", UserId);
        // Retrieve
        // document.getElementById("result").innerHTML = localStorage.getItem("lastname");
        //} else {
        // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        //}

        this.getOwnerComponent()
          .getRouter()
          .getRoute("manager")
          .attachPatternMatched(this.checkLogin, this);
      },

      checkLogin: function () {
        var userInfo = this.getOwnerComponent().getModel("UserInfo").getData();
        console.log(userInfo);
        if (!userInfo.isManager) {
          jQuery.sap.require("sap.m.MessageBox");
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          console.log("error message");
          sap.m.MessageBox.error(
            "You must be logged in if you want to use the application.",
            {
              title: "Log in",
              onClose: function () {
                oRouter.navTo("login");
              },
              styleClass: "", // default
              actions: sap.m.MessageBox.Action.Close, // default
              emphasizedAction: null, // default
              initialFocus: null, // default
              textDirection: sap.ui.core.TextDirection.Inherit, // default
            }
          );
        }
      },

      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
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
        var data = { isUser: false, isManager: false };
        var oModel = new JSONModel(data);
        var userInfo = this.getOwnerComponent().setModel(oModel, "UserInfo");

        var oRouter = this.getRouter();
        oRouter.navTo("login");
      },

      onFilterData : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("UId", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("idTrips");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

    onPressDetail: function(oEvent){
        var oRouter = this.getRouter();
        oRouter.navTo("detail");
    },

    onReset: function (oEvent){

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
      onFilterData : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("UId", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("idTrips");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
    });

    return OverflowToolbarController;
  }
);
