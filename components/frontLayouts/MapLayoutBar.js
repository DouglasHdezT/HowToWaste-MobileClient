import React from 'react';

import { StyleSheet, View, Slider } from 'react-native';
import RecyclerMapSearch from '../forms/RecyclerMapSearch';

const MapLayoutBar = ({options = [], onSelectOption, circleRadius, changeRadius}) => {
	return(
		<View style = { styles.container }>
			<Slider 
				style = {{ width: "40%" }}
				thumbTintColor = "#3F51B5"
				minimumTrackTintColor = "#3F51B5"

				minimumValue = { 100 }
				maximumValue = { 1000 }
				step = { 100 }
				value = { circleRadius }
				onValueChange = { changeRadius }
				/>
			<RecyclerMapSearch options = { options } onSelectOption = { onSelectOption } />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "absolute",
		top: Platform.select({ios: 40, android: 40}),
		left: 0,

		flexDirection: "column-reverse",
		alignItems: "flex-end"

	}
});

export default MapLayoutBar;