import React, { Component } from 'react';
import { keysUser } from '../models/user.model';

interface DropdownSortProps {
    selectOption: any;
}

interface DropdownSortState {
    userFields: string[];
}

export class DropdownSort extends Component<DropdownSortProps, DropdownSortState> {
    constructor(props: DropdownSortProps) {
        super(props);
        this.state = {
            userFields: keysUser
        }
    }

    selectOption = (field: string) => {
        this.props.selectOption(field);
    }
    render() {
        const {userFields} = this.state;
        return (
            <div className="dropdown" style={{width: "300px"}}>
                <button className="btn btn-secondary dropdown-toggle" 
                        type="button" id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                        Select field
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {userFields.map(field => {
                        return (
                            <span key={field} className="dropdown-item" onClick={() => {this.selectOption(field)}}>{field}</span>
                        );
                    })}
                </div>
            </div>
        );
    }
}