module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    arrowParens: "avoid",
    overrides: [
        {
            files: "*.svg",
            options: {
                parser: "html",
            },
        },
    ],
    plugins: [require('prettier-plugin-tailwindcss')],
};
