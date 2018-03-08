import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../actions/modal_actions';

export const DELETE_WAYPOINT_MODAL_TYPE = 'DELETE_WAYPOINT_MODAL_TYPE';
export const CLEAR_WAYPOINTS_MODAL_TYPE = 'CLEAR_WAYPOINTS_MODAL_TYPE'; 

class Modal extends Component {
    constructor(props) {
        super(props);

        this.modalData = {
            DELETE_WAYPOINT_MODAL_TYPE: {header: 'Delete waypoint', body: 'Are you sure you want to delete this waypoint?'},
            CLEAR_WAYPOINTS_MODAL_TYPE: {header: 'Clear waypoints', body: 'Are you sure you want to delete all waypoints?'}
        }
    }

    componentDidMount () {
        $(this.modal).modal({
            backdrop: "static",
            show: false
        });
        // $(this.modal).on("hidden.bs.modal", function () {
        //     console.log("hidden!!!")
        // });
    }

    componentWillUnmount () {
        // $(this.modal()).off();
    }

    componentDidUpdate(prevProps, prevState) {
        const showModalEnabled = this.props.modalState.showModalEnabled;
        const prevShowModalEnabled = prevProps.modalState.showModalEnabled;
        if (showModalEnabled != prevShowModalEnabled) {
            if (showModalEnabled) {
                $(this.modal).modal("show");
            } else {
                $(this.modal).modal("hide");
            }
        }
    }

    proceed() {
        this.props.modalActions.endShowModal();
        this.props.modalState.modalSuccessCallback && this.props.modalState.modalSuccessCallback(...this.props.modalState.modalSuccessCallbackData);
    }

    cancel() {
        this.props.modalActions.endShowModal();
    }

    render() {
        const header = (this.props.modalState.modalType != '') ? this.modalData[this.props.modalState.modalType].header : 'header'; 
        const body = (this.props.modalState.modalType != '') ? this.modalData[this.props.modalState.modalType].body : 'body';

        return (
            <div ref={(comp) => { this.modal = comp; }} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">{header}</h4>
                            <button onClick={() => {this.cancel()}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {this.cancel()}} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button onClick={() => {this.proceed()}} type="button" className="btn btn-primary">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
