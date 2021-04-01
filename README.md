# eslint-plugin-handled-await

Ensure that failing await calls are handled

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-handled-await`:

```
$ npm install eslint-plugin-handled-await --save-dev
```


## Usage

Add `handled-await` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "handled-await"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "handled-await/handled-await": "error"
    }
}
```

## Supported Rules

* [handled-await](docs/rules/handled-await.md)
