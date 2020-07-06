import React,{useState} from 'react';

import { StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import BaseStyles from '../../constants/BaseStyles';

import TopEndVectorButton from '../buttons/TopEndVectorButton';
import ModedText from '../text/ModedText';
import PacmanIndicator from "react-native-indicators/src/components/pacman-indicator";

const CameraLayout = ({flipCameraAction,camera}) => {
	const [height,setHeight] = useState("15%")
	const [loading,isLoading] = useState(false)

	const loadingSpinner=()=>{
		return(
			<View>
				<PacmanIndicator color={Colors.primaryColor} size={20}/>
			</View>
		)
	}

	const takePicture = async()=>{
		if(camera){
			let photo = await camera.takePictureAsync()
			console.log(photo)
		}
	}
	return(
		<View style = { styles.container }>
			<TopEndVectorButton
				width = { 48 }
				height = { 48 }
				onPress = { flipCameraAction }>
				<View style = {{
					width: 40,
					height: 40,
					borderRadius: 24,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: Colors.primaryColor,
				}}>
					<Ionicons name="md-reverse-camera" size={25} color="white"/>
				</View>
			</TopEndVectorButton>

			<View style = {{ ...styles.infoLayout,
					height: height,
					borderTopStartRadius: useWindowDimensions().width / 5,
					borderTopEndRadius: useWindowDimensions().width / 5,
				}}>

				<View style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<TouchableOpacity
						onPress={takePicture}
						style = {{ justifyContent: "center", alignItems: "center" }}>
						<AntDesign name="scan1" size={32} color="black" />
						<ModedText title center centerV>Escanear</ModedText>
					</TouchableOpacity>
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
		width: "100%",
		paddingTop:10,

		justifyContent: "flex-end",

		borderWidth: 15,
		borderBottomWidth:0,
		borderColor:"white",

		backgroundColor: "white",
		...BaseStyles.materialShadowUp
	}
});

export default CameraLayout;
