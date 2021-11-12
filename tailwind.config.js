const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['./app/**/*.{html,js,tsx}', './common/**/*.{html,js,tsx}'],
    theme: {
        extend: {
            colors: {
                ...colors,
                gray: colors.coolGray,
            },
        },
        /*  minHeight: {
            0: '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            full: '100%',
        }, */
    },
    plugins: [],
};
