import * as Types from '../constants/ActionTypes';

var initialState = [];

const findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if(product.id === id) {
            result = index;
        }
    })
    return result;
}

const products = (state = initialState, aciton) => {
    var index = -1;
    switch(aciton.type) {
        case Types.FETCH_PRODUCTS: 
            state = aciton.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = findIndex(state, aciton.id)
            if(index !== -1) {
                state.splice(index, 1);
            }
            return [...state];
        case Types.ADD_PRODUCT: 
            state.push(aciton.product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = findIndex(state, aciton.product.id);
            console.log(aciton.product);
            if(index !== -1) {
                state[index] = aciton.product;
            }
            return [...state];
        default: return [...state];
    }
}

export default products;