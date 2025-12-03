
// Import math helpers directly from utils/evMath.  The services
// directory has been removed and these functions are now colocated in
// evMath.js to reduce duplication and simplify imports.
const { clvA2, devigMultiplicative, arb3way } = require('../utils/evMath');
module.exports = {
  clv(req,res){ const {openOdds,closeOdds}=req.body; res.json({clv:clvA2(openOdds,closeOdds)}); },
  devig(req,res){ const {probs}=req.body; res.json({fair:devigMultiplicative(probs)}); },
  arb(req,res){ const {p1,p2,p3}=req.body; res.json({arb:arb3way(p1,p2,p3)}); }
};