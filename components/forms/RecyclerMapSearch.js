/*
Copyright (c) 2020 AKHeroes.

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
Software, and to permit persons to whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

import React, { useState } from 'react';

import { StyleSheet, Keyboard, TextInput, TouchableOpacity } from 'react-native';

import AutocompleteInput from 'react-native-autocomplete-input';
import ModedText from '../text/ModedText';

const RecyclerMapSearch = ({ options = [], onSelectOption }) => {
	const [ query, setQuery ] = useState("");
	
	const filteredOptions = filterData(options, query)

	return(
		<AutocompleteInput
			data = {filteredOptions}
			keyExtractor = { (item, index) => `${item._id}.${index}` }
			
			containerStyle = { styles.container }
			inputContainerStyle = { styles.inputContainer}
			listContainerStyle = { styles.listContainer }
			listStyle = { styles.list }
			renderTextInput = {()=>(
				<TextInput
					value = { query }
					onChangeText={text => {setQuery(text)} } 
					placeholder = "Busca plantas recicladoras"
					style = { styles.textInput } />
			)}
			renderItem = {({item}) => (
				<TouchableOpacity
					onPress={() => {
						Keyboard.dismiss();
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