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

import { Text } from 'react-native';

const ModedText = props => {
	const style = props.style ? props.style : {};
	const fontSize = props.big ? 24 : 16;
	const fontFamily = props.title ? "monserrat-bold" : "roboto-light";
	const color = props.white ? "white" : "black";
	const textAlign = props.center ? "center" : "left";
	const textAlignVertical = props.centerV ? "center" : "top";
	const marginLeft = props.tab ? 16 : 0;

	return(
		<Text style = {{
			fontSize,
			fontFamily,
			color,
			textAlign,
			textAlignVertical,
			marginLeft,
			...style,
		}}>
			{ props.children }
		</Text>
	);
}

export default ModedText;
