const { override, addWebpackExternals } = require("customize-cra");

module.exports = override(
  addWebpackExternals({
    sqlite3: "commonjs sqlite3"
  })
);
