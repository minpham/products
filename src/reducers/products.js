var initialState = [
    {
        id: 1,
        name: 'Iphone 8 Plus',
        price: 700,
        status: true
    },
    {
        id: 2,
        name: 'Samsung Galaxy Note 8',
        price: 800,
        status: false
    },
    {
        id: 3,
        name: 'Oppo F1s',
        price: 400,
        status: false
    }
]

const products = (state = initialState, aciton) => {
    switch(aciton.type) {
        default: return [...state];
    }
}

export default products;