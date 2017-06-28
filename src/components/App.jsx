import React from "react";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AccountantTable from './AccountantTable.jsx';

import "./App.less"

import operationType from "../operationType.json";
import tableData from "../tableData.json";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operationTypes: operationType,
            tableData: tableData,
            selected: [],
            inputData: {
                text: '',
                price: '',
                value: 1
            }
        };

        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleRowSelection(selectedRows) {
        if (!selectedRows || !selectedRows.length) {
            return;
        }
        this.setState({
            selected: selectedRows
        });
    }

    handleTouchTap() {
        if (!this.state.inputData.text || !this.state.inputData.price || !this.state.inputData.value) {
            return;
        }

        let tableData = this.state.tableData.slice();
        tableData.push({
            "name": this.state.inputData.text,
            "price": this.state.inputData.price,
            "type": this.state.inputData.value
        });
        this.setState({
            tableData: tableData,
            inputData: {
                text: '',
                price: '',
                value: 1
            }
        });
    }

    handleTextChange(evt) {
        const inputData = Object.assign(this.state.inputData, { text: evt.target.value });
        this.setState({
            inputData: inputData
        });
    }

    handlePriceChange(evt) {
        const inputData = Object.assign(this.state.inputData, { price: parseInt(evt.target.value) });
        this.setState({
            inputData: inputData
        });
    }

    handleSelectChange(event, index, value) {
        const inputData = Object.assign(this.state.inputData, { value: value });
        this.setState({
            inputData: inputData
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="app-main">
                    <div className="container">
                        <div className="row app-header">
                            <div className="col-sm-4">
                                <TextField value={this.state.inputData.text}
                                           hintText="Операция"
                                           fullWidth={true}
                                           onChange={this.handleTextChange}/>
                            </div>
                            <div className="col-sm-3">
                                <TextField value={this.state.inputData.price}
                                           hintText="Цена"
                                           fullWidth={true}
                                           type="number"
                                           onChange={this.handlePriceChange}/>
                            </div>
                            <div className="col-sm-3">
                                <SelectField value={this.state.inputData.value}
                                             fullWidth={true}
                                             onChange={this.handleSelectChange}
                                >
                                    {
                                        this.state.operationTypes.map(type => {
                                            return (
                                                <MenuItem key={type.id}
                                                          value={type.id}
                                                          primaryText={type.value}
                                                />
                                            );
                                        })
                                    }
                                </SelectField>
                            </div>
                            <div className="col-sm-2">
                                <RaisedButton label="Добавить"
                                              fullWidth={true}
                                              onTouchTap={this.handleTouchTap}
                                              backgroundColor="#69d116"
                                              labelColor="#fff"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <AccountantTable tableData={this.state.tableData}
                                                 operationTypes={this.state.operationTypes}
                                                 selected={this.state.selected}
                                                 handleRowSelection={this.handleRowSelection}/>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;