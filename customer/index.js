import {calculatePriceTTC} from "./utils.js";


const priceHT = [
	{ name : "Apple", priceHT : 1.0, priceTTC : null },
	{ name : "Orange", priceHT : 1.2, priceTTC : null },
	{ name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

priceHT.forEach((item) => {
	item.priceTTC = calculatePriceTTC(item.priceHT)
})

console.table(priceHT, ["name", "priceTTC"]) //Le tableau en second paramètre permet de n'afficher que les proprietées qui sont listée