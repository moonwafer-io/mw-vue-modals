
export function styleCombiner(baseStyles: any, styleOverrides: any) {
    // Don't want to impact the original object.
    let computedStyles = JSON.parse(JSON.stringify(baseStyles));

    // Now override anything in the mwModalConfig prop
    if (styleOverrides) {
        for (let key of Object.keys(styleOverrides)) {
            computedStyles[key] = styleOverrides[key];
        }
    }

    return computedStyles;
}