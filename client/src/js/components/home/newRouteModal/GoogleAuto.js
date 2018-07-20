/* Googles autocomplete input box */

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
        .then(results => {
            if(this.props.placeholder === 'Start Location'){
                RoutesStore.setGoogleOriginResult(results[0]);
            }else{
                RoutesStore.setGoogleDestinationResult(results[0]);
            }
            
            getLatLng(results[0])
            .then(latLng => {
                if(this.props.placeholder === 'Start Location'){ 
                    RoutesStore.setOrigin(latLng);
                }else{
                    RoutesStore.setdestination(latLng);
                }
            })
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
                {
                    ({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div className="col-11 mx-auto pad-0">
                        <input
                        {...getInputProps({
                            placeholder: this.props.placeholder,
                            className: 'form-control brad-2rem' // Class to change the input box
                        })}
                        />
                        <div className="autocomplete-dropdown-container"> {/*Class for the dropdown box that contains all the suggestions*/}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer', color:'#000' } //Styling for selected suggestion
                                : { backgroundColor: '#ffffff', cursor: 'pointer', color:'#000' }; //Styling for all other suggestions
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    )
                }
            </PlacesAutocomplete>
        );
    }
}
export default LocationSearchInput;