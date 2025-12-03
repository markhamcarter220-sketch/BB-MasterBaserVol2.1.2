// Map raw market data into a normalised structure containing sport, market, book and price.
function mapMarket(raw){
  return {
    sport: raw.sport || 'unknown',
    market: raw.market || 'ML',
    book: raw.book || 'mock',
    price: raw.price ?? null
  };
}
module.exports={mapMarket};