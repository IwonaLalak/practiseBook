import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ButtonAction = (props) => {
    return (
        <Button onClick={props.onClick}
                bsStyle={props.btnColor}
                bsSize={props.btnSize}
                disabled={props.btnDisabled}
        ><i className={props.iconType}></i> {props.btnText}</Button>
    );
};

ButtonAction.propTypes = {
    onClick: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    btnColor: PropTypes.string,
    btnSize: PropTypes.string,
    iconType: PropTypes.string,
    btnDisabled: PropTypes.bool
};

ButtonAction.defaultProps = {
    btnText: 'Wykonaj',
    iconType: 'fa fa-wrench',
    btnColor: 'primary',
    btnSize: 'small',
    btnDisabled: false
};

export const ButtonAdd = (props) => {
    return (
        <Button onClick={props.onClick}
                bsStyle={props.btnColor}
                bsSize={props.btnSize}
                disabled={props.btnDisabled}
        ><i className={props.iconType}></i> {props.btnText}</Button>
    );
};

ButtonAdd.propTypes = {
    onClick: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    btnColor: PropTypes.string,
    btnSize: PropTypes.string,
    iconType: PropTypes.string,
    btnDisabled: PropTypes.bool
};

ButtonAdd.defaultProps = {
    btnText: 'Dodaj',
    iconType: 'fa fa-plus',
    btnColor: 'success',
    btnSize: 'small',
    btnDisabled: false
};

export const ButtonSave = (props) => {
    return (
        <Button onClick={props.onClick}
                bsStyle={props.btnColor}
                bsSize={props.btnSize}
                disabled={props.btnDisabled}
        ><i className={props.iconType}></i> {props.btnText}</Button>
    );
};

ButtonSave.propTypes = {
    onClick: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    btnColor: PropTypes.string,
    btnSize: PropTypes.string,
    iconType: PropTypes.string,
    btnDisabled: PropTypes.bool
};

ButtonSave.defaultProps = {
    btnText: 'Zapisz',
    iconType: 'fa fa-save',
    btnColor: 'success',
    btnSize: 'small',
    btnDisabled: false
};