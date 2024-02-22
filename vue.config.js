// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// });


const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      const newArgs = [{ ...args[0] }];
      newArgs[0]["__VUE_PROD_DEVTOOLS__"] = JSON.stringify(false);
      newArgs[0]["__VUE_PROD_ERROR_HANDLING__"] = JSON.stringify(true);
      newArgs[0]["__VUE_PROD_HYDRATION_MISMATCH_DETAILS__"] =
        JSON.stringify(true);
      return newArgs;
    });
  },
});
