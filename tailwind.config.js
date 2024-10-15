/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'kalameh': 'KalamehWeb',
                'kalameh-num': 'KalamehWebFaNum',
            },
            boxShadow: {
                normal: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
            }
        },
        container: {
            center: true,
            padding: '1rem'
        }
    },
    plugins: [],
}

