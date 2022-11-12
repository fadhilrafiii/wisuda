module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // Pertimbangkan untuk menggunakan `plugin:vue/strongly-recommended` atau `plugin:vue/recommended` untuk memperketat aturan.
    "plugin:vue/recommended",
  ],
  // diperlukan untuk melinting file *.vue
  plugins: ["vue"],
  // tambahkan aturan anda disini
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
  },
}
