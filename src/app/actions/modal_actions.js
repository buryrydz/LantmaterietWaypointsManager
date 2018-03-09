export const START_SHOW_MODAL = 'START_SHOW_MODAL';
export const END_SHOW_MODAL = 'END_SHOW_MODAL';

export function startShowModal(modalType, modalData) {
    return {
        type: START_SHOW_MODAL,
        modalType: modalType,
        modalData: modalData
    }
}

export function endShowModal() {
    return {
        type: END_SHOW_MODAL
    }
}