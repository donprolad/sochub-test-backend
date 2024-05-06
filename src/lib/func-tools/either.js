const Left = (x) => ({
    fmap: f => Left(x),
    fold: (f, g) => f(x),
    chain: f => f(x)
})

const Right = (x) => ({
    fmap: f => Right(f(x)),
    fold: (f, g) => g(x),
    chain: f => f(x)
})