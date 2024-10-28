/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                yellow: '#FFC43F',
                orange: '#F39C12',
                dark: '#222222',
                light: '#727272',
                white: '#ffffff',
                grey: '#dbdbdb',
                lightGrey: '#fafafa',
                primaryColor: '#6995B1',
                lightPrimary: '#eef1f3',
                bgBlue: '#e6f3fa',
                bgRed: '#f9ebe7',
                bgGreen: '#d9f8e3',
                bgYellow: '#eef5e5',
                bgOrange: '#fff39c',
                bgPurple: '#f7f0f7',
                bgPink: '#f9e5f2',
            },
            fontFamily: {
                Garamond: ["Cormorant Garamond", 'serif'],
                Nunito: [ "Nunito"],
            }
        },
    },
    plugins: [],
}

