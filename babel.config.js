module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.NODE_ENV === 'cjs' ? 'cjs' : false,
      },
    ],
    '@babel/preset-typescript',
  ],
  targets: {
    esmodules: process.env.NODE_ENV === 'esm',
  },
}
