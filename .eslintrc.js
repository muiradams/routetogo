module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "mocha"
    ],
    "rules": {
        "no-unused-vars": 1,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
};