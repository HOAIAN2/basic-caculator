const HISTORY_ACTION = {
    ADD: 'ADD',
    CLEAR: 'CLEAR'
}
function reducer(state, action) {
    switch (action.type) {
        case HISTORY_ACTION.ADD:
            return [...state, action.payload]
        case HISTORY_ACTION.CLEAR:
            return []
        default:
            break
    }
}
export { HISTORY_ACTION }
export default reducer