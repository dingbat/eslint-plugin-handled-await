const rule = require("../../../lib/rules/handled-await");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  }
});

const errors = [{
  message: "await expression does not .catch() and is not in a try block",
  type: "AwaitExpression"
}];

const ruleTester = new RuleTester();
ruleTester.run("handled-await", rule, {
  valid: [
    "async () => { try { await foo(); } catch (e) {} }",
    "async () => { try {} catch (e) { await foo().catch() } }",
    "async () => { try {} catch (e) { try { await foo() } catch (e) {} } }",
    "async () => { try { await foo(); } finally { await foo().catch(e) } }",
    "async () => { try { await foo(); } finally { try { await foo() } catch (e) {} } }",
    "async () => { await foo().catch(); }",
    "async () => { await foo.catch(); }",
    "async () => { await foo.bar().catch(); }",
  ],

  invalid: [
    { code: "async function a() { await foo(); }", errors },
    { code: "async () => { await foo().catch().then(); }", errors },
    { code: "async () => { try {} catch (e) { await foo(); } }", errors },
    { code: "async () => { try {} finally { await foo(); } }", errors },
  ]
});
