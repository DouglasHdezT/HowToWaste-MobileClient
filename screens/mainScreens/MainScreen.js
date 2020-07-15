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

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import MapTab from '../tabs/MapTab';
import CameraTab from '../tabs/CameraTab';
import InfoTab from '../tabs/InfoTab';

import Colors from '../../constants/Colors';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = () => {
	return(
		<Tab.Navigator
			shifting = {true}
			barStyle = {{
				backgroundColor:Colors.primaryColor,

				borderTopWidth: 0.5,
				borderTopLeftRadius: 15,
				borderTopRightRadius: 15,
				borderColor: 'transparent',

				overflow: 'hidden',
			}} >
			<Tab.Screen name = "Mapa" component = {MapTab} options = {{ tabBarIcon: ({focus, color}) => (<FontAwesome name="map" size={24} color={color} />)}}/>
			<Tab.Screen name = "Camara" component = {CameraTab} options = {{ tabBarIcon: ({focus, color}) => (<AntDesign name="camera" size={24} color={color} />) }}/>
			<Tab.Screen name = "Info" component = {InfoTab} options = {{ tabBarIcon: ({focus, color}) => (<FontAwesome name="info-circle" size={24} color={color} />)}}/>
		</Tab.Navigator>
	)
}

export default MainScreen;
