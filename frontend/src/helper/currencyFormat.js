const formatCash = (str) => {
    str = str.toString()
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}

export default formatCash