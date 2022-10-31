const reducer = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case 'FETCH_ALL':
            return payload;
        case 'CREATE':
            return [...state, payload ]
        case 'UPDATE':
            return state.map(post => post._id == payload._id ? payload : post)
        default:
            return state;
    }
}

export default reducer