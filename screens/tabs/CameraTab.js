/*
Copyright (c) 2020 AKHeroes.

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
Software, and to permit persons to whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

import CameraLayout from '../../components/frontLayouts/CameraLayout';
import ModedText from '../../components/text/ModedText';

const CameraTab = (props) => {
	const [hasPermission, setHasPermission] = useState(undefined);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [{width, height}, setDimensions] = useState({width: 0, height: 0});
	const isFocused = useIsFocused();
	const [cameraRef, setCameraRef] = useState(null)
	
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
			console.log(status);
		})();
	}, []);

	if (hasPermission === undefined) {
		return <View/>;
	}
	if (hasPermission === false) {
		return (
			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
				<ModedText>No tengo permisos para cámara</ModedText>
			</View>
		);
	}
	
	return (
		<View
			onLayout = { (event) => {
				const { width, height } = event.nativeEvent.layout;
				setDimensions({width, height});
			} }
			style={ styles.container }>

			{isFocused && <Camera style={{ height: height, width: (3 * height) / 4}} type={type} ref={ref=>setCameraRef(ref)} />}

			<CameraLayout
				camera={cameraRef}
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
