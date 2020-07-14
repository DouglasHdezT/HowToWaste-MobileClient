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

import React from 'react';

import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import BaseStyles from '../../constants/BaseStyles';

import ModedText from '../text/ModedText';

const RecyclerPlantCard = ({name, direction, onPressText, onPressMarker, last, unique}) => {
	return(
		<View style = {{ ...styles.container, marginRight: last ? 0 :  8, width: unique ? "100%" : "auto"}}>
			<TouchableOpacity style = {{flex: 1, width: "100%"}} onPress = { onPressText }>
				<ModedText 
					style = { {...styles.textBox, fontSize: 20} } white title> 
					{ name.length > 15 ? `${name.substr(0, 15)}...` : name } 
				</ModedText>

				<ModedText 
				style = { {...styles.textBox, textAlignVertical: "top"} } white> 
					{ direction.length > 30 ? `${direction.substr(0, 30)}...` : direction } 
				</ModedText>
			</TouchableOpacity>
	
			<TouchableOpacity onPress = {onPressMarker}>
				<FontAwesome name="map-marker" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minWidth: Dimensions.get("window").width * 2 / 3,
		padding: 16,
		backgroundColor: Colors.cardBackgroud,

		justifyContent: "center",
		alignItems: "center",

		borderBottomEndRadius: 20,
		borderTopStartRadius: 20,
		
		...BaseStyles.materialShadow,
	},
	textBox:{
		flex: 1,
		width: "100%",
		textAlignVertical: "center"
	}
});

export default RecyclerPlantCard;