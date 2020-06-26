import React from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';

import RecyclerPlacesCarousel from '../carousels/RecyclerPlacesCarousel';

const dummyData = [
	{
		id: "1",
		name: "Place 1",
		direction: "Somewhere in the endless sky",
	},

	{
		id: "2",
		name: "Some fantanstic place 2",
		direction: "Here in your heart",
	},

	{
		id: "3",
		name: "The real and only Recycler place",
		direction: "Wherever you want",
	},
	{
		id: "4",
		name: "Recycler place",
		direction: "Nowhere",
	},
	{
		id: "5",
		name: "Bottle",
		direction: "Megaton",
	}
]

const MapLayout = props => {
	return(
		<View style = { styles.container }>
			<RecyclerPlacesCarousel data = { dummyData }/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: Dimensions.get("window").height/4,

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