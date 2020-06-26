import React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';

import RecyclerPlacesCarousel from '../carousels/RecyclerPlacesCarousel';

const MapLayout = ({ carrouselData, onSelectOption }) => {
	return(
		<View style = { styles.container }>
			<RecyclerPlacesCarousel 
				onSelectOption = { onSelectOption }
				data = { carrouselData }/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: Dimensions.get("window").height/5,

		padding: 8,
		
		position: "absolute",
		bottom:0,
		left:0,

		justifyContent: "flex-end",
		alignItems:"center",

		backgroundColor: "transparent"
	}
});

export default MapLayout;