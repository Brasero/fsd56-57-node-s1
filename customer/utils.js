export const calculatePriceTTC = (priceHT, tva = 0.2) => {
	return Math.floor(((priceHT * tva) + priceHT) * 100) / 100
}