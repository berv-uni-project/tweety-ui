let URL = "/";
if (!process.env.IS_DOCKER) {
  URL = process.env.NODE_ENV === "production" ? "/tweety-ui/" : "/";
}

module.exports = {
  publicPath: URL
};
