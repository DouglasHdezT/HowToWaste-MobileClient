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