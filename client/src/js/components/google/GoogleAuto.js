// File Type: Component

import { observer } from "mobx-react";
import React from 'react'
import { TextField } from '@material-ui/core';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import RoutesStore from '../../stores/RoutesStore';

import './../../../css/components/Autocomplete.css';
/*
 * Purpose: provides the google start and end location input boxes that autocomplete.
 */
@observer class LocationSearchInput extends React.Component {

    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'address' is
     * the actual address that the user enters or selects from the dropdown.
     */
    constructor(props) {
        super(props);
        this.state = { address: '' }
    }

    /*
     * Purpose: sets the address to the value of the input box when the user edits the input box.
     */
    handleChange = (address) => {
        this.setState({ address })
    }

    /*
     * Purpose: sets the address value to the selected address and also sets the google origin and 
     * destination in the 'RoutesStore'.
     */
    handleSelect = (address) => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => {

                if (this.props.placeholder === 'Start Location') {
                    RoutesStore.setGoogleOriginResult(results[0]);
                } else {
                    RoutesStore.setGoogleDestinationResult(results[0]);
                }

                getLatLng(results[0])
                    .then(latLng => {

                        if (this.props.placeholder === 'Start Location') {
                            RoutesStore.setOrigin(latLng);
                        } else {
                            RoutesStore.setdestination(latLng);
                        }

                    })
            })
            .catch(error => console.error('Error', error))
    }

    /*
     * Purpose: renders the component in the DOM.
     */
    render() {

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {
                    ({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <TextField
                                {...getInputProps({
                                        label: this.props.placeholder,
                                })}
                                fullWidth
                            />
                            <div className="autocomplete-container"> {/* Class for the dropdown box that contains all the suggestions*/}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // Inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer', color: '#000' } // Styling for selected suggestion
                                        : { backgroundColor: '#ffffff', cursor: 'pointer', color: '#000' }; // Styling for all other suggestions

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