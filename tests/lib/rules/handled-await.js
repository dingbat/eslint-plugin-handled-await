const rule = require("../../../lib/rules/handled-await");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  }
});

const ruleTester = new RuleTester();
ruleTester.run("handled-await", rule, {
  valid: [
    "async () => { try { await foo(); } catch (e) {} }",
    "async () => { try { await foo(); } finally {} }",
    "async () => { await foo().catch(); }",
    "async () => { await foo.catch(); }",
    "async () => { await foo.bar().catch(); }",
  ],

  invalid: [
    {
      code: "async function a() { await foo(); }",
      errors: [{
        message: "await expression does not .catch() and is not in a try-catch block",
        type: "AwaitExpression"
      }]
    },
    {
      code: "async () => { await foo().catch().then(); }",
      errors: [{
        message: "await expression does not .catch() and is not in a try-catch block",
        type: "AwaitExpression"
      }]
    }
  ]
});
