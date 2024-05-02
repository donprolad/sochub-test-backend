const IdFunctor = (x) => ({
    x,
    map: f => IdFunctor(f(x)),
    fold: f => f(x),
    [Symbol.iterator]: { x }
})

export default IdFunctor