module.exports = function(api) {
  // Cache configuration based on NODE_ENV
  api.cache.using(() => process.env.NODE_ENV);

  const isTest = api.env('test') || process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;

  const presets = isTest
    ? [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-react"
      ]
    : [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-react"
      ];

  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins,
    env: {
      production: {
        only: ["src"],
        plugins: [
          [
            "transform-react-remove-prop-types",
            {
              removeImport: true
            }
          ],
          "@babel/plugin-transform-react-inline-elements",
          "@babel/plugin-transform-react-constant-elements"
        ]
      }
    }
  };
};
