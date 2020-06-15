import React from 'react';

import { Text } from 'react-native';

const ModedText = props => {
	const style = props.style ? props.style : {};
	const fontSize = props.title ? 24 : 16;
	const fontFamily = props.title ? "monserrat-bold" : "roboto-light";
	const color = props.white ? "white" : "black";
	const textAlign = props.center ? "center" : "left";
	const textAlignVertical = props.centerV ? "center" : "top";

	return(
		<Text style = {{
			fontSize,
			fontFamily,
			color,
			textAlign,
			textAlignVertical,
			...style,
		}}>
			{ props.children }
		</Text>
	);
}

export default ModedText;