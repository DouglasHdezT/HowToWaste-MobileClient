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

import { StyleSheet, View, Slider, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import RecyclerMapSearch from '../forms/RecyclerMapSearch';
import ModedText from '../text/ModedText';

const MapLayoutBar = ({options = [], onSelectOption, circleRadius, changeRadius, onPressLocation}) => {
	return(
		<View style = { styles.container }>
			<View style={ styles.toolsContainer }>
				<TouchableOpacity style={{marginLeft: 16}} onPress = {onPressLocation}>
					<MaterialCommunityIcons name="target-account" size={26} color="#3F51B5" />
				</TouchableOpacity>
				
				<View style={styles.silderContainer}>
					<Slider 
						style = {{flex: 1}}
						thumbTintColor = "#3F51B5"
						minimumTrackTintColor = "#3F51B5"
		
						minimumValue = { 100 }
						maximumValue = { 2000 }
						step = { 100 }
    
						value = { circleRadius }
						onValueChange = { changeRadius }
					/>
					<ModedText>
						{ `${(circleRadius/1000).toFixed(1)} km` }
					</ModedText>
				</View>
			</View>
			<RecyclerMapSearch options = { options } onSelectOption = { onSelectOption } />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "absolute",
		top: Platform.select({ ios: 40, android: 40 }),
		left: 0,

		flexDirection: "column-reverse",
		alignItems: "flex-end"

	},
	toolsContainer: {
		width: "100%",
		paddingHorizontal: 16,
		marginTop: 8,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	silderContainer: {
		width: "45%",
		flexDirection: "row",
		justifyContent: "flex-end"
	}
});

export default MapLayoutBar;