const And = (x) => ({
    x,
    concat: o => And(x && o.x),
    [Symbol.iterator]: { x }
})