import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

const TopEndVectorButton = ({children, width, height, onPress}) => {
	return(
		<TouchableOpacity
			style = {{ ...styles.container, width, height }}
			onPress = { onPress }>
			{ children }
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		right: 0,

		margin: 16,

		justifyContent: "center",
		alignItems: "center"
	}
});

export default TopEndVectorButton;