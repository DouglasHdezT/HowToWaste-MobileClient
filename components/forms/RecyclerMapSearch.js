import React, { useState } from 'react';

import { StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native';

import AutocompleteInput from 'react-native-autocomplete-input';
import ModedText from '../text/ModedText';

const RecyclerMapSearch = ({ options = [], onSelectOption }) => {
	const [ query, setQuery ] = useState("");
	
	const filteredOptions = filterData(options, query)

	return(
		<AutocompleteInput
			data = {filteredOptions}
			keyExtractor = { item => item._id }
			
			containerStyle = { styles.container }
			inputContainerStyle = { styles.inputContainer}
			listContainerStyle = { styles.listContainer }
			listStyle = { styles.list }
			renderTextInput = {()=>(
				<TextInput
					value = { query }
					onChangeText = { text => setQuery(text) } 
					placeholder = "Busca plantas recicladoras"
					style = { styles.textInput } />
			)}
			renderItem = {({item}) => (
				<TouchableOpacity
					onPress = {() => {
						setQuery("");
						onSelectOption(item)
					}}
					style = { styles.itemText }>
					<ModedText style = {{ fontSize: 16 }} title> { item.name } </ModedText>
					<ModedText tab> { item.direction } </ModedText>
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

	return options.filter(item => item.name.search(regex) >= 0 || item.direction.search(regex) >= 0);
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
		borderWidth: 0,
	},
	textInput: {
		backgroundColor: "#fff",

		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 12,

		fontFamily: "roboto-light",
		fontSize: 18,
	},
	listContainer:{
		marginHorizontal: 16,
		borderWidth: 0,
	},
	list: {
		borderWidth: 0,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	itemText: {
		marginVertical: 4
	}
});

export default RecyclerMapSearch;