import {START_SHOW_MODAL, END_SHOW_MODAL} from '../actions/modal_actions';

const modalState = {
    showModalEnabled: false,
    modalType: '',
    modalSuccessCallback: null,
    modalSuccessCallbackData: []
}

export default function(state=modalState, action) {
    switch (action.type) {
        case START_SHOW_MODAL:
            return Object.assign({}, state, {
                showModalEnabled: true,
                modalType: action.modalType,
                modalSuccessCallback: action.modalData.callback,
                modalSuccessCallbackData: action.modalData.callbackData
            })
        case END_SHOW_MODAL:
            return Object.assign({}, state, {
                showModalEnabled: false
            })
    }

    return state;
}