import * as Types from '../constants/ActionTypes';

var InitialState = {
    id: '',
    name: '',
    price: '',
    status: ''
};

const itemEditing = (state = InitialState, action) => {
    switch(action.type) {
        case Types.EDIT_PRODUCT:
            state = {...action.product};
            return {...state};
        default:
            return {...state};
    }
}

export default itemEditing;