
// Import math helpers from utils/evMath.  The services directory has been
// removed in favor of consolidating these helpers into a single module.
const { clvA2, devigMultiplicative, arb3way } = require('../utils/evMath');
describe('math engines', ()=>{
  test('clv computes',()=>{
    expect(clvA2(-110,-105)).not.toBeNaN();
  });
  test('devig normalizes',()=>{
    const r=devigMultiplicative([0.4,0.4,0.2]);
    expect(r.reduce((a,b)=>a+b,0)).toBeCloseTo(1);
  test('arb detects',()=>{
    expect(arb3way(2,2,2)).toBe(false);
});