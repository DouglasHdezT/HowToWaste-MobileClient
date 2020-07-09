import React, { useState } from 'react';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MainNavStack from './screens/stacks/MainNavStack';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function App() {
	const [dataLoaded, setDataLoaded] = useState(false);

	const splashScreen = <AppLoading startAsync={loadData} onFinish={() => setDataLoaded(true)} />
	const mainScreen = <MainNavStack />

	return (
		<View style={{ flex: 1 }}>
			{dataLoaded ? mainScreen : splashScreen}
			<FlashMessage position="top" />
		</View>
	);
}

const loadData = async () => {
	//Cargando fuentes
	await Font.loadAsync({
		"roboto": require('./assets/fonts/Roboto-Regular.ttf'),
		"roboto-light": require('./assets/fonts/Roboto-Light.ttf'),
		"roboto-bold": require('./assets/fonts/Roboto-Bold.ttf'),
		"roboto-thin": require('./assets/fonts/Roboto-Thin.ttf'),
		"monserrat": require('./assets/fonts/Montserrat-Regular.ttf'),
		"monserrat-light": require('./assets/fonts/Montserrat-Light.ttf'),
		"monserrat-bold": require('./assets/fonts/Montserrat-Bold.ttf'),
		"monserrat-thin": require('./assets/fonts/Montserrat-Thin.ttf'),
	})
	console.log("Fuentes cargadas")
}