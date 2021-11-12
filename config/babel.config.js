module.exports = {
   cacheDirectory: true,
   cacheIdentifier: 'v9', ///cache version
   presets: [
      [
         'babel-preset-cx-env',
         {
            targets: {
               chrome: 60, ///version
            },
            // corejs: 3,
            // useBuiltIns: 'usage',
            modules: false, ///because webpack does it
            loose: true, /// generate simpler code?

            cx: {
               jsx: {
                  trimWhitespace: true,
               },
               imports: {
                  useSrc: true,
               },
            },
         },
      ],
   ],
   plugins: [
      ['@babel/plugin-proposal-private-methods', { loose: false }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
   ],
};
