import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import MapTab from '../tabs/MapTab';
import CameraTab from '../tabs/CameraTab';
import Colors from '../../constants/Colors';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
	return(
		<NavigationContainer>
			<Tab.Navigator shifting = {true}  barStyle = {{ borderTopEndRadius: 15, borderTopStartRadius: 15, backgroundColor: Colors.primaryColor }} >
				<Tab.Screen name = "Mapa" component = {MapTab} options = {{ tabBarIcon: ({focus, color}) => (<FontAwesome name="map" size={24} color={color} />)}}/>
				<Tab.Screen name = "Camara" component = {CameraTab} options = {{ tabBarIcon: ({focus, color}) => (<AntDesign name="camera" size={24} color={color} />) }}/>
				<Tab.Screen name = "Info" component = {MapTab} options = {{ tabBarIcon: ({focus, color}) => (<FontAwesome name="info-circle" size={24} color={color} />)}}/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default MainScreen;
