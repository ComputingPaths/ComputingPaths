module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-async-promise-executor': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react/no-array-index-key': 'off'
  },
    }
};
