import React from 'react';

import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import TopEndVectorButton from '../buttons/TopEndVectorButton';

const CameraLayout = ({flipCameraAction}) => {
	return(
		<View style = { styles.container }>
			<TopEndVectorButton
				width = { 48 }
				height = { 48 }
				onPress = { flipCameraAction }>
				<View style = {{
					width: 48,
					height: 48,
					borderRadius: 24,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.primaryColor,
				}}>
					<Ionicons name="md-reverse-camera" size={32} color="white"/>
				</View>
			</TopEndVectorButton>

			<View style = {{ ...styles.infoLayout,
					borderTopStartRadius: useWindowDimensions().width / 10,
					borderTopEndRadius: useWindowDimensions().width / 10,
				}}>

				<View style = {{ flex: 1, backgroundColor: "red" }}>

				</View>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		
		position: "absolute",
		top:0,
		left:0,

		justifyContent: "flex-end",
		alignItems:"center",

		backgroundColor: "transparent"
	},
	infoLayout:{
		height: "20%",
		width: "50%",
		paddingTop:10, 

		justifyContent: "flex-end",

		borderWidth: 15,
		borderBottomWidth:0,
		borderColor:"white",
		
		backgroundColor: "white",
		transform:[{scaleX:2}]
	}
});

export default CameraLayout;