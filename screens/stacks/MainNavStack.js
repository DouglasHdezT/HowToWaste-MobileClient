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

import React from 'react';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabHome from '../mainScreens/MainScreen';
import RecyclerPlaceScreen from '../mainScreens/RecyclerPlaceScreen';

const Stack = createStackNavigator();
	
const MainNavStack = props => {
	return(
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				headerStyle: {
					backgroundColor: "#388E3C"
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontFamily: "roboto-light"
				}
			}}>
				<Stack.Screen name="Home" component={MainTabHome} options={{ header: () => { } }} />
				<Stack.Screen name="RecyclerPlace" component={RecyclerPlaceScreen} options={{ title: "Hoja Informativa" }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});

export default MainNavStack;