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
  
      return BaseController.extend("intern2020.controller.ChangePassword", {
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
        }
      });
  
      return OverflowToolbarController;
    }
  );
  