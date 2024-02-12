export default class AppData {
    constructor(food) {
        this.food = [];
    }

    addFood(carbs, protein, fat) {
        this.food.push({carbs: Number.parseInt(carbs, 10), protein: Number.parseInt(protein, 10), fat: Number.parseInt(fat, 10)});
        console.log(this.food);
    }

    getTotalCarbs() {
        return this.food.reduce((total, current) => {
            return total + current.carbs;
        }, 0)
    }

    getTotalProtein() {
        return this.food.reduce((total, current) => {
            return total + current.protein;
        }, 0)
    }

    getTotalFat() {
        return this.food.reduce((total, current) => {
            return total + current.fat;
        }, 0)
    }
}