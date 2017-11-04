import React from 'react';
import PropTypes from 'prop-types';
export default class If extends React.Component {

    render() {
        if (this.props.isTrue) {
            return this.props.children;
        } else {
            return false;
        }
    }
}

If.propTypes = {
    isTrue: PropTypes.bool.isRequired
}