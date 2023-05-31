//const { format } = require('date-fns')
const { format, zonedTimeToUtc } = require('date-fns-tz');
const formatoPeru = "dd/MM/yyyy HH:mm:ss";
const peruTimeZone = "America/Lima";
const f = zonedTimeToUtc(new Date(), peruTimeZone);


function getFecha(){
    return format(f, formatoPeru, { timeZone: peruTimeZone });
}
module.exports = { getFecha };