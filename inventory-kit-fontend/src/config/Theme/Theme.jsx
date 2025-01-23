// src/config/Theme/Theme.js

import { extendTheme } from '@mui/material/styles';
const Theme = extendTheme({
    // colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});
export default Theme;