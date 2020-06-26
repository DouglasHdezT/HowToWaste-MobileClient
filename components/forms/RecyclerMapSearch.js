import React, { useState } from 'react';

import { StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';

import AutocompleteInput from 'react-native-autocomplete-input';
import ModedText from '../text/ModedText';

const RecyclerMapSearch = ({ options = [], onSelectOption }) => {
	const [ query, setQuery ] = useState("");
	
	const filteredOptions = filterData(options, query)

	return(
		<AutocompleteInput
			onChangeText = { text => setQuery(text) }
			data = {filteredOptions}
			keyExtractor = { item => item._id }
			
			containerStyle = { styles.container }
			inputContainerStyle = { styles.inputContainer}
			renderTextInput = {()=>(
				<TextInput 
					placeholder = "Busca plantas recicladoras"
					style = { styles.textInput } />
			)}
			renderItem = {({item}) => (
				<TouchableOpacity>
					<ModedText> { item.name } </ModedText>
					<ModedText> { item.direction } </ModedText>
				</TouchableOpacity>
			)}
		/>
	);
}

const filterData = (options, query) => {
	if(query === ""){
		return [];
	}

	const regex = new RegExp(`${query.trim()}`, "i");

	return options.filter(item => item.name.search(regex) >= 0);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "absolute",
		top: Platform.select({ios: 60, android: 50}),
		left: 0,
	},
	inputContainer: {
		marginHorizontal: 12,
		borderColor: "transparent"
	},
	textInput: {
		backgroundColor: "#fff",

		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 12,

		fontFamily: "roboto-light",
		fontSize: 18,
	},
	itemText: {

	}
});

export default RecyclerMapSearch;