/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./*/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    theme: {
        extend: {
            transitionProperty: {
                'width': 'width'
            }
        },
    },
    plugins: [require("tw-elements/dist/plugin")]
    ,
}