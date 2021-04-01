# Ensure that failing await calls are handled (handled-await)

Are you paranoid that you forgot to handle a possibly-failing `await` calls?
Strive to have graceful error handling for all async calls?

## Rule Details

This rule aims to catch instances of `await` expressions whose failure is not
handled. This could mean that they're not wrapped in a `try-catch` block, or
that the awaited expression does not itself handle errors (with `.catch()`).

Examples of **incorrect** code for this rule:

```js
async function foo() {
  await bar();
}
```

Examples of **correct** code for this rule:

```js
async function foo() {
  await bar().catch(() => ...);
}

async function foo() {
  try {
    await bar();
  } catch (e) {
    ...
  }
}
```

## When Not To Use It

If you like living on the edge.

## Further Reading

See [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)'s [catch-or-return](https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/catch-or-return.md) rule for something similar for promises.
