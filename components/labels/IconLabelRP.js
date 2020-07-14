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

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ModedText from '../text/ModedText';
import { MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

const IconLabelRP = ({ text, type, size, color, iconColor, onPress }) => {
	const mainColor = color ? color : "#000";
	const mainIconColor = iconColor ? iconColor : "#000";
	const iconSize = size ? size : 20;
	const MainComponent = onPress ? TouchableOpacity : View;

	let icon = undefined;
	switch (type) {
		case "email":
			icon = <Ionicons name="md-mail" size={iconSize} color={mainIconColor} />;
			break;
		case "web":
			icon = <MaterialCommunityIcons name="web" size={iconSize} color={mainIconColor} />;
			break;
		case "contact":
			icon = <MaterialIcons name="person" size={iconSize} color={mainIconColor} />;
			break;
		case "material":
			icon = <FontAwesome name="recycle" size={iconSize} color={mainIconColor} />;
			break;
		case "phone":
			icon = <Entypo name="phone" size={iconSize} color={mainIconColor} />;
			break;
		case "service":
			icon = <MaterialCommunityIcons name="dump-truck" size={iconSize} color={mainIconColor} />;
			break;
		case "direction":
			icon = <FontAwesome name="map-marker" size={iconSize} color={mainIconColor} />
			break;
		default:
			icon = <FontAwesome name="recycle" size={iconSize} color={mainIconColor} />;
			break;
	}

	return (
		<MainComponent style={styles.mainContainer} onPress={onPress}>
			{ icon }
			<ModedText
				style={{color: mainColor}}
				tab> {text}</ModedText>
		</MainComponent>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		paddingStart: 24,
		marginBottom: 8,

		flexDirection: "row",
		alignItems: "center",
	}
});

export default IconLabelRP;