const IdFunctor = (x) => ({
    x,
    fmap: f => IdFunctor(f(x)),
    fold: f => f(x),
    [Symbol.iterator]: { x }
})

export default IdFunctor