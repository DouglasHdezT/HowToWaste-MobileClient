import React from 'react';

import { StyleSheet, View } from 'react-native';

const DividerHorizontal = ({ center }) => {
	return (
		<View style={{...styles.container, alignItems: center ? "center":"flex-start"}}>
			<View style={styles.divider}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 1,

		justifyContent: "center",
		marginVertical: 8
	},
	divider: {
		width: "70%",
		height: 1,

		backgroundColor: "#AAA"
	}
});

export default DividerHorizontal;