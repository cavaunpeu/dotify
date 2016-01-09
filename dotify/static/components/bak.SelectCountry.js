import React from 'react';
import Select from 'react-select';

var SelectCountry = React.createClass({
    getInitialState () {
        return {
            disabled: false,
            searchable: true,
            selectCountry: "",
            clearable: false,
            placeholder: "country",
            noResultsText: "where's that?",
            inputClass: ".Select-input",
            inputValueClass: ".Select-value-label",
            noBorderClassname: "no-border",
        };
    },
    excludeDefaultCountry (option, filterValue) {
        if (option["className"] !== "default" && ~option["value"].indexOf(filterValue)) {
            return option;
        }
    },
    onChange (newCountry) {
        this.setState({
            selectCountry: newCountry
        });
        if (document.querySelector(this.state.inputClass).classList.contains(this.state.noBorderClassname)) {
            if (!newCountry) {
                document.querySelector(this.state.inputClass).classList.remove(this.state.noBorderClassname);
            }
        }
        else {
            document.querySelector(this.state.inputClass).classList.add(this.state.noBorderClassname);
        }
    },
    onBlur (event) {
        if (document.querySelector(this.state.inputValueClass)) {
            document.querySelector(this.state.inputClass).classList.add(this.state.noBorderClassname);
        }
    },
    onFocus (event) {
        if (!document.querySelector(this.state.inputValueClass)
            && document.querySelector(this.state.inputClass).classList.contains(this.state.noBorderClassname)
            ) {
            document.querySelector(this.state.inputClass).classList.remove(this.state.noBorderClassname);
        }
    },
    onInputChange (inputValue) {
        if (!document.querySelector(this.state.inputValueClass)
            && inputValue !== ""
            && document.querySelector(this.state.inputClass).classList.contains(this.state.noBorderClassname)
            ) {
            document.querySelector(this.state.inputClass).classList.remove(this.state.noBorderClassname);
        }
        if (inputValue === "" && document.querySelector(this.state.inputValueClass)) {
            document.querySelector(this.state.inputClass).classList.add(this.state.noBorderClassname);
        }
    },
    render () {
        var options = [
            { value: "country", label: "country", className: "default" },
            { value: "colombia", label: "Colombia", className: "country" },
            { value: "dominican republic", label: "Dominican Republic", className: "country" },
            { value: "venezuela", label: "Venezuela", className: "country" },
            { value: "nicaragua", label: "Nicaragua", className: "country" }
        ];
        return (
            <div className="select-country">
                <Select onInputChange={this.onInputChange} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChange} placeholder={this.state.placeholder} noResultsText={this.state.noResultsText} filterOption={this.excludeDefaultCountry} autofocus options={options} simpleValue clearable={this.state.clearable} disabled={this.state.disabled} value={this.state.selectCountry} searchable={this.state.searchable} />
            </div>
        );
    }
});


module.exports = SelectCountry;
