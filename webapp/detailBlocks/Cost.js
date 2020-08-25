sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
  
    var Block = BlockBase.extend("intern2020.detailBlocks.Cost", {
      metadata: {
        views: {
          Collapsed: {
            viewName: "intern2020.detailBlocks.Cost",
            type: "XML",
          },
          Expanded: {
            viewName: "intern2020.detailBlocks.Cost",
            type: "XML",
          },
        },
      },
    });
  
    return Block;
  });
  