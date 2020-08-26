sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
  "use strict";

  var Block = BlockBase.extend("intern2020.detailBlocks.General", {
    metadata: {
      views: {
        Collapsed: {
          viewName: "intern2020.detailBlocks.General",
          type: "XML",
        },
        Expanded: {
          viewName: "intern2020.detailBlocks.General",
          type: "XML",
        },
      },
    },
  });

  return Block;
});
