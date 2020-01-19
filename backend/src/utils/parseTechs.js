module.exports = function parseStringToArray(values) {
    return values.split(',').map(tech => tech.trim());
}
