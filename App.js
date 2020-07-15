/*
Copyright (c) 2020 AKHeroes.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software with	out restriction, including without limitation the rights to use,
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
