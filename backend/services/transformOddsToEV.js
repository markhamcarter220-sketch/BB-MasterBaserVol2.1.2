const { calculateImpliedProbability, calculateFairOdds, calculateEdge } = require('../utils/evMath');

// Transform an array of odds into an array enriched with implied probability, fair odds, edge and expected value.
module.exports = function transformOddsToEV(odds){
  return odds.map(o=>{
    const implied = calculateImpliedProbability(o.price);
    const fair = calculateFairOdds(implied);
    const edge = calculateEdge(fair, o.price);
    return {
      ...o,
      impliedProbability: implied ?? 0,
      fairOdds: fair ?? null,
      edge: edge ?? 0,
      evDollar: edge ? edge/100 : 0
    };
  });
};