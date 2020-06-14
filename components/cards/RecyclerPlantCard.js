import React from 'react';

import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import BaseStyles from '../../constants/BaseStyles';

import ModedText from '../text/ModedText';

const RecyclerPlantCard = ({name, direction, onPressText, onPressMarker, last}) => {
	return(
		<View style = {{ ...styles.container, marginRight: last ? 0 :  8}}>
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
		minWidth: Dimensions.get("window").width / 2,
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