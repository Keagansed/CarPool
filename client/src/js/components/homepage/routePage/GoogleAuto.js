import React from 'react'
import { observer } from "mobx-react";
import RoutesStore from '../../../stores/RoutesStore';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

@observer class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);  
        this.state = { address: '' }
    }
    
    handleChange = (address) => {
        this.setState({ address })
    }
    
    handleSelect = (address) => {
        this.setState({ address });
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            console.log("success",latLng);
            if(this.props.placeholder==='Origin'){
                RoutesStore.setOrigin(latLng);
            }else{
                RoutesStore.setdestination(latLng);
                this.props.finishSelect;
            }
            // alert(RoutesStore.origin.lat);
        })
        .catch(error => console.error('Error', error))
    }
    
    render() {
        return (
            <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: this.props.placeholder,
                            className: 'location-search-input' //=========== Class to change the shape and size of input box
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer', color:'#000' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer', color:'#000' };
                            return (
                                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                <span>{suggestion.description}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            </PlacesAutocomplete>
        );
    }
}
export default LocationSearchInput;