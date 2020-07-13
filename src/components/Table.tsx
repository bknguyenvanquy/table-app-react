import React, { Component } from 'react';
import { UserModel } from '../models/user.model';
import { convertPhoneNumber, convertDate } from '../helpers';

interface TableProps {
    listUsers: UserModel[];
}

export class Table extends Component<TableProps, any>{
    constructor(props: TableProps) {
        super(props);
    }
    render() {
        const { listUsers } = this.props;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers.map((user: UserModel) => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.email}</td>
                                    <td>{convertPhoneNumber(user.phone)}</td>
                                    <td>{user.salary}</td>
                                    <td>{convertDate(user.birthday)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}