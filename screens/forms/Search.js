import React, {useState} from 'react';
import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete'

const Search = (props) => {

    return (
        <>
            <GooglePlacesAutocomplete
                placeholder="¡Busca un lugar aquí!"
                onPress={(data, details = null) => {
                    props.onSelectLocation(details.geometry.location.lat, details.geometry.location.lng)
                }}
                minLength={3}
                placeholderTextColor={"#7f8c8d"}
                query={{
                    key: "AIzaSyBFuPCQs2jw7XycLqN6kym368ooifn1-dw",
                    language: 'en'
                }}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                }}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ios: 60, android: 50}),
                        width: '100%'
                    },
                    textInputContainer: {
                        marginHorizontal: 10,
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,

                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        padding: 15,
                        borderRadius: 54 / 2,
                        elevation: 8, // Shadow android
                        shadowColor:"#2d3436", // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: {x: 0, y: 0}, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        fontSize: 18,
                    },
                    listView: {
                        marginHorizontal: 20,
                        borderColor: "#7f8c8d",
                        backgroundColor: "#fff",
                        elevation: 8,
                        shadowColor: "#7f8c8d", // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: {x: 0, y: 0}, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        marginTop: 15,
                    },
                    description: {
                        fontSize: 15
                    },
                    row: {
                        padding: 18,
                        height: 58
                    }
                }}

            />
        </>
    );
}

export default Search
