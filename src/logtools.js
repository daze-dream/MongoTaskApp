
/**helper function to log to console. Provides formatting with date and time*/
const logToConsole = (message) => {
    var dateOBJ = new Date();
    var date = dateOBJ.toLocaleDateString();
    var time = dateOBJ.toLocaleTimeString();
    console.log(date + '/' + time + ': ' + message)
}

module.exports = {
    logToConsole: logToConsole
}