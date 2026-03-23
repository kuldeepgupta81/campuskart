export function getRecommendations(cart, products) {
  if (cart.length === 0) return [];

  const category = cart[0].category;

  return products
    .filter((p) => p.category === category)
    .slice(0, 4);
}