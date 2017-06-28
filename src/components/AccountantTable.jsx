import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import style from "./AccountantTable.less"

class AccountantTable extends Component {
    constructor(props) {
        super(props);

        this.handleRowSelection = this.handleRowSelection.bind(this);
    }

    isSelected(index) {
        return this.props.selected.indexOf(index) !== -1;
    };

    handleRowSelection(selectedRows) {
        this.props.handleRowSelection(selectedRows);
    };

    getOperationType(operationTypes, row) {
        const type = operationTypes.filter(type => type.id === row.type)[0];
        return type.value ? type.value : '';
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props.tableData) !== JSON.stringify(nextProps.tableData) ||
            JSON.stringify(this.props.selected) !== JSON.stringify(nextProps.selected);
    }

    getTableBalance(tableData) {
        return tableData.map(data => data.type === 1 ? data.price : data.price * -1).reduce((a, b) => parseInt(a) + parseInt(b));
    }

    render() {
        console.log('render table');
        return (
            <Table onRowSelection={this.handleRowSelection}
                   style={style}
                   fixedHeader={true}>

                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn className="app-table-id">ID</TableHeaderColumn>
                        <TableHeaderColumn className="app-table-operation">Операция</TableHeaderColumn>
                        <TableHeaderColumn className="app-table-price"
                                           style={{textAlign: 'right'}}>Цена</TableHeaderColumn>
                        <TableHeaderColumn className="app-table-type"
                                           style={{textAlign: 'center'}}>Тип</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody showRowHover={true} deselectOnClickaway={false}>
                    {
                        this.props.tableData.map((row, index) => (
                            <TableRow key={index}
                                      selected={this.isSelected(index)}>
                                <TableRowColumn className="app-table-id">
                                    {index + 1}
                                </TableRowColumn>
                                <TableRowColumn className="app-table-operation">
                                    {row.name}
                                </TableRowColumn>
                                <TableRowColumn className="app-table-price"
                                                style={{textAlign: 'right'}}>
                                    {row.price}
                                </TableRowColumn>
                                <TableRowColumn className="app-table-type"
                                                style={{textAlign: 'center'}}>
                                    {this.getOperationType(this.props.operationTypes, row)}
                                </TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>

                <TableFooter>
                    <TableRow style={{verticalAlign: 'top'}}>
                        <TableRowColumn className="app-table-id"/>
                        <TableRowColumn className="app-table-operation"/>
                        <TableRowColumn className="app-table-price"
                                        style={{textAlign: 'right', fontWeight: 'bold'}}>
                            {this.getTableBalance(this.props.tableData)}
                        </TableRowColumn>
                        <TableRowColumn className="app-table-type"
                                        style={{textAlign: 'left', fontWeight: 'bold'}}>
                            Баланс
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>

            </Table>
        );
    }
}

export default AccountantTable;