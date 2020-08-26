sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
  
    var Block = BlockBase.extend("intern2020.detailBlocks.Employee", {
      metadata: {
        views: {
          Collapsed: {
            viewName: "intern2020.detailBlocks.Employee",
            type: "XML",
          },
          Expanded: {
            viewName: "intern2020.detailBlocks.Employee",
            type: "XML",
          },
        },
      },
    });
  
    return Block;
  });