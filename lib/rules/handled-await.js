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
        if (
          node.argument.type === "CallExpression" &&
          node.argument.callee.property &&
          node.argument.callee.property.name === "catch"
        ) {
          // .catch() is called on the await argument
          return;
        }
        let parent = node.parent;
        while (parent) {
          const grandparent = parent.parent;
          if (
            grandparent &&
            grandparent.type === "TryStatement" &&
            (parent === grandparent.finalizer || parent === grandparent.handler)
          ) {
            // we reached a "catch" or "finally" before we reached a "try"
            break;
          }
          if (parent.type === "TryStatement") {
            // we reached a "try", we are good
            return;
          }
          parent = parent.parent;
        }
        context.report({
          node,
          message: "await expression does not .catch() and is not in a try block",
        });
      }
    };
  },
};
