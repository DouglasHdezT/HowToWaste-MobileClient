import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

import CameraLayout from '../../components/frontLayouts/CameraLayout';

const CameraTab = (props) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [{width, height}, setDimensions] = useState({width: 0, height: 0});
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View
			onLayout = { (event) => {
				const { width, height } = event.nativeEvent.layout;
				setDimensions({width, height});
			} } 
			style={ styles.container }>
			
			{isFocused && <Camera style={{ height: height, width: (3 * height) / 4}} type={type}/>}

			<CameraLayout 
				flipCameraAction = {()=>{
					setType(type === Camera.Constants.Type.back ? 
						Camera.Constants.Type.front : 
						Camera.Constants.Type.back);
				}}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black"
	}
});

export default CameraTab;