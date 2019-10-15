const {join} = require(`path`);

const path = join(__dirname, `public`);

const entry = `./src/index.js`;
const output = {
  filename: `bundle.js`,
  path,
};

const contentBase = path;
const compress = false;
const hot = true;
const open = true;
const port = 1339;
const devServer = {contentBase, compress, hot, open, port};

const babelizing = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: `babel-loader`,
  },
};

const rules = [babelizing];

const resolve = {
  extensions: [`.js`, `.jsx`],
};

module.exports = {
  entry,
  output,
  resolve,
  devServer,
  module: {rules},
  devtool: `source-map`,
};
