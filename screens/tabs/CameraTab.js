import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

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
			style={{ flex: 1, justifyContent: "center", backgroundColor: "#000" }}>
			{isFocused && <Camera style={{ height: (4 * width) / 3}} type={type}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent',
						flexDirection: 'row',
					}}>
					<TouchableOpacity
						style={{
							flex: 0.1,
							alignSelf: 'flex-end',
							alignItems: 'center',
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}>
						<Text style={{ ...styles.text, fontSize: 16 }}> Flip </Text>
					</TouchableOpacity>
				</View>
			</Camera>}
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		marginBottom: 10, 
		color: 'white'
	}
});

export default CameraTab;