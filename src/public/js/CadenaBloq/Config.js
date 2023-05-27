const { format } = require('date-fns')
const formatoPeru = "dd/MM/yyyy HH:mm:ss";
const f = new Date()


const Fecha = function getFecha(){
    return format(f, formatoPeru)
}
module.exports = Fecha();