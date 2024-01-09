// @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontSize: {
                s: ['12px', 'normal'],
                m: ['14px', 'normal'],
                l: ['16px', 'normal'],
                xl: ['18px', 'normal'],
            },
            spacing: {
                '6px': '6px',
                '8px': '8px',
                '10px': '10px',
                '12px': '12px',
                '16px': '16px',
                '24px': '24px',
                '32px': '32px',
                '55px': '55px',
                '64px': '64px',
            },
            screens: {
                'md': '992px',
            },
            colors: {
                'primary-dark': '#233447',
                'secondary-dark': '#3b536c',
                'primary-light': '#fff',
                'secondary-light': '#FAFAFA',
                'dark-blue': '#182431',
            }
        },
    },
    plugins: [],
}

