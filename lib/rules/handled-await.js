module.exports = {
  meta: {
    docs: {
      description: "Ensure that failing await calls are handled",
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create: function (context) {
    return {
      AwaitExpression(node) {
        if (node.argument.type === "CallExpression" && node.argument.callee.property && node.argument.callee.property.name === "catch") {
          return;
        }
        let parent = node.parent;
        while (parent) {
          if (parent.type === "TryStatement") {
            return;
          }
          parent = parent.parent;
        }
        context.report({
          node,
          message: 'await expression does not .catch() and is not in a try-catch block',
        });
      }
    };
  }
};
