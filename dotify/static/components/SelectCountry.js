import React from 'react';
import Select from 'react-select';

var SelectCountry = React.createClass({
    getInitialState () {
        return {
            disabled: false,
            searchable: true,
            selectCountry: '',
            clearable: true,
        };
    },
    updateCountry (newCountry) {
        this.setState({
            selectCountry: newCountry
        });
        console.log("onChange!");
        console.log("newCountry " + newCountry);
        // if (newCountry && document.querySelector(".Select-input").classList.contains("no-border") && document.querySelector(".Select-value-label")) {
        //     document.querySelector(".Select-input").classList.remove("no-border");
        //     console.log("adding border!");
        // }
        if (document.querySelector(".Select-input").classList.contains("no-border")) {
            if (!newCountry) {
                document.querySelector(".Select-input").classList.remove("no-border");
                console.log("adding border!");
            }
        }
        else {
            document.querySelector(".Select-input").classList.add("no-border");
            console.log("removing border!");
        }
        // if (!document.querySelector(".Select-input").classList.contains("no-border") && document.querySelector(".Select-value-label")) {
        //     document.querySelector(".Select-input").classList.add("no-border");
        //     console.log("removing border!");
        // }
    },
    excludeDefaultCountry (option, filterValue) {
        if (option['className'] !== 'default' && ~option['value'].indexOf(filterValue)) {
            return option;
        }
    },
    onBlur (event) {
        console.log("onBlur!");
        if (document.querySelector(".Select-value-label")) {
            document.querySelector(".Select-input").classList.add("no-border");
            console.log("removing border!");
        }
    },
    onFocus (event) {
        console.log("onFocus!");
        if (!document.querySelector(".Select-value-label") && document.querySelector(".Select-input").classList.contains("no-border")) {
            document.querySelector(".Select-input").classList.remove("no-border");
            console.log("adding border!");
        }
    },
    onInputChange (inputValue) {
        console.log("onInputChange!")
        if (!document.querySelector(".Select-value-label") && inputValue !== "" && document.querySelector(".Select-input").classList.contains("no-border")) {
            document.querySelector(".Select-input").classList.remove("no-border");
            console.log("adding border!");
        }
        if (inputValue === "" && document.querySelector(".Select-value-label")) {
            document.querySelector(".Select-input").classList.add("no-border");
            console.log("removing border!");
        }
    },
    render () {
        var options = [
            { value: 'country', label: 'country', className: 'default' },
            { value: 'colombia', label: 'Colombia', className: 'country' },
            { value: 'venezuela', label: 'Venezuela', className: 'country' },
            { value: 'nicaragua', label: 'Nicaragua', className: 'country' }
        ];
        return (
            <div className="select-country">
                <Select onInputChange={this.onInputChange} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.updateCountry} ref="stateSelect" placeholder='country' noResultsText="where's that?" filterOption={this.excludeDefaultCountry} autofocus options={options} simpleValue clearable={this.state.clearable} name="selected-country" disabled={this.state.disabled} value={this.state.selectCountry} searchable={this.state.searchable} />
            </div>
        );
    }
});


module.exports = SelectCountry;
