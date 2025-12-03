// Apply filtering rules to an array of odds entries based on provided criteria.
function applyFilters(data, filters){
  return data.filter(item=>{
    if(filters.minEV && item.evDollar < filters.minEV) return false;
    if(filters.minEdge && item.edge < filters.minEdge) return false;
    if(filters.market && item.market !== filters.market) return false;
    return true;
  });
}
module.exports={applyFilters};