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
			<Stack.Navigator>
				<Stack.Screen name="Home" component={MainTabHome} options={{ header: () => { } }} />
				<Stack.Screen name="RecyclerPlace" component={RecyclerPlaceScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});

export default MainNavStack;