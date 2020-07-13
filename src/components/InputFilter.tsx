import React, { Component } from 'react';

interface InputFilterProps {
    searchAction: any;
}

interface InputFilterState {
    textSearch: string;
}

export class InputFilter extends Component<InputFilterProps, InputFilterState> {
    textInput: any;
    constructor(props: InputFilterProps) {
        super(props);
        this.state = {
            textSearch: ''
        };
        this.textInput = React.createRef();
    }

    onSearch = () => {
        this.props.searchAction(this.textInput.current.value);
        this.setState({ textSearch: this.textInput.current.value});
    }
    render() {
        return (
            <div className="input-group mb-3" style={{ width: "700px" }}>
                <input type="text" 
                        className="form-control" 
                        placeholder="Enter user name to search user" 
                        aria-label="Enter user name to search user" 
                        aria-describedby="button-addon2"
                        ref={this.textInput}
                        onChange={this.onSearch}/>
            </div>
        );
    }
}