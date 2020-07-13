import React, { Component } from 'react'
import { UserModel, keysUser } from '../models/user.model';
import { DropdownSort } from './DropdownSort';
import { InputFilter } from './InputFilter';
import { Table } from './Table';
import * as users from '../data/users.json';
import { sortByDateTime, sortByNumberValue, sortByStringValue } from '../helpers';

interface MainState {
    listUsers: UserModel[];
    usersPerPage: UserModel[];
    fieldSort: string;
    limit: number;
    offset: number;
    pageIndex: number;
    quantityPages: number;
}

let listUsersOriginal = (users as any).default;
export class Main extends Component<any, MainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            listUsers: listUsersOriginal,
            usersPerPage: this.getUserPerPage(listUsersOriginal, 0, 1, 10),
            fieldSort: '',
            limit: 10,
            offset: 0,
            pageIndex: 1,
            quantityPages: Math.ceil(listUsersOriginal.length / 10)
        };
    }

    getUserPerPage = (listUsers: UserModel[], offset: number, pageIndex: number, limit: number) => {
        let usersPerPage = [];
        for (let i = offset; i < pageIndex * limit; i++) {
            usersPerPage.push(listUsers[i]);
        }
        return usersPerPage;
    }

    handleDropdown = (fieldSort: string) => {
        const { listUsers } = this.state;
        if (fieldSort === 'birthday') {
            listUsers.sort((userA: UserModel, userB: UserModel) => {
                return sortByDateTime(userA[fieldSort], userB[fieldSort]);
            });
        } else if (fieldSort === 'salary' || fieldSort === 'id') {
            listUsers.sort((userA: UserModel, userB: UserModel) => {
                return sortByNumberValue(userA[fieldSort], userB[fieldSort]);
            });
        } else {
            listUsers.sort((userA: any, userB: any) => {
                return sortByStringValue(userA[fieldSort], userB[fieldSort]);
            });
        }
        let offset = 0;
        let pageIndex = 1;
        let limit = 10;
        let usersPerPage = this.getUserPerPage(listUsers, 0, 1, 10);
        let quantityPages = Math.ceil(listUsers.length / limit);
        this.setState({ listUsers, fieldSort, usersPerPage, offset, pageIndex, limit, quantityPages });
    }

    handleInput = (textSearch: string) => {
        let listUsers = [...listUsersOriginal];
        if (textSearch) {
            listUsers = listUsers.filter((user: any) => {
                return keysUser.some(key => {
                    return user[key].toString().toLowerCase() === textSearch.toLowerCase();
                });
            });
        }
        let offset = 0;
        let pageIndex = 1;
        let limit = 10;
        let usersPerPage = this.getUserPerPage(listUsers, 0, 1, 10);
        let quantityPages = Math.ceil(listUsers.length / limit);
        this.setState({ listUsers, usersPerPage, offset, pageIndex, limit, quantityPages });
    }
    prevPage = () => {
        let {pageIndex, quantityPages} = this.state;
        pageIndex = pageIndex - 1;
        if (pageIndex < 1) {
            pageIndex = quantityPages;
        }
        this.selectPage(pageIndex);
    }

    nextPage = () => {
        let {pageIndex, quantityPages} = this.state;
        pageIndex = pageIndex + 1;
        if (pageIndex > quantityPages) {
            pageIndex = 1;
        }
        this.selectPage(pageIndex);
     }

    selectPage = (pageIndexSelected: number) => { 
        let { listUsers, usersPerPage, offset, pageIndex, limit } = this.state;
        pageIndex = pageIndexSelected;
        offset = (pageIndex - 1) * limit;
        usersPerPage = this.getUserPerPage(listUsers, offset, pageIndex, limit);
        this.setState({ usersPerPage, offset, pageIndex });
    }

    render() {
        const { fieldSort, usersPerPage, quantityPages, pageIndex } = this.state;
        return (
            <div>
                <div className="tool-bar">
                    <div>
                        <span>Sort:</span><span> by {fieldSort}</span>
                        <DropdownSort selectOption={this.handleDropdown} />
                    </div>
                    <div>
                        <span>Filter:</span>
                        <InputFilter searchAction={this.handleInput} />
                    </div>
                </div>
                <Table listUsers={usersPerPage} />
                <div className="paging-table">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={this.prevPage}>
                                <span className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </li>
                            {
                                new Array(quantityPages).fill(0)
                                .map((item, index) => {
                                    return <li key={index} className={`page-item ${pageIndex === (index + 1) ? 'active' : '' }`}>
                                            <span className="page-link" onClick={() => this.selectPage(index + 1)}>
                                                {index + 1}
                                            </span>
                                            </li>;
                                })
                            }
                            <li className="page-item" onClick={this.nextPage}>
                                <span className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}