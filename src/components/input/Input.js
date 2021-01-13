import React, { Component } from 'react';

export default class Input extends Component {

    handleChangeInput = (event) => {
        const { onChange } = this.props;
        
        const text = event.target.value;
        onChange(text);
    };

    render() {
        const { label, readOnly, value } = this.props;

        return (
            <div>
                <label>{label}</label>
                {
                    readOnly ?
                    <input type="text" readOnly={readOnly} defaultValue={value} />
                    :
                    <input type="text" readOnly={readOnly} value={value}
                        onChange={this.handleChangeInput} />
                }
            </div>
        );
    }

}