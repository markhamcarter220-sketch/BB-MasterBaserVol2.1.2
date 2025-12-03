const betLog = [];

exports.logBet = (req, res) => {
  const { odds, closingOdds, stake, result } = req.body;
  const timestamp = new Date().toISOString();
  const clv = ((closingOdds - odds) / odds * 100).toFixed(2);

  const entry = { odds, closingOdds, stake, result, clv: Number(clv), timestamp };
  betLog.push(entry);

  res.json({ success: true, entry });
};

exports.getBets = (req, res) => {
  res.json(betLog);
};