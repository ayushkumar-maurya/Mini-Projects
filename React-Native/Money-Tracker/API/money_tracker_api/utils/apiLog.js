module.exports = (type, loc, ...msgs) => {
  type = type ? `[${type}]` : ''
  loc = loc ? `[${loc}]` : ''

  console.log(`\nMONEY-TRACKER-API-LOG: ${type} ${loc}`);
  for(let msg of msgs)
    console.log(`[${msg}]`);
};
