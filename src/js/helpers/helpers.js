export const capitalize = (name) => {
    return (`${name[0].toUpperCase()}${name.substring(1)}`);
}

export const calculateCalories = (carbs, protein, fat) => {
    return (carbs*4)+(protein*4)+(fat*9);
}