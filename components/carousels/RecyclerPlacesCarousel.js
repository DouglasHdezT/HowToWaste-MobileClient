import React from 'react';

import { StyleSheet, FlatList, View } from 'react-native';
import RecyclerPlantCard from '../cards/RecyclerPlantCard';

const RecyclerPlacesCarousel = ({data, onSelectOption}) => {
	const _renderItem = (item, index) => (
		<RecyclerPlantCard
			onPressMarker = { () => onSelectOption(item) }
			unique = {data.length === 1 ? true : false}
			last = {index !== (data.length -1) ? false : true}
			name = {item.name} 
			direction = {item.direction}/>)
	
	return(
		<View style = {{ flex: 1 }}>
			<FlatList
				horizontal
				data = { data }
				renderItem = { ({item, index}) => _renderItem(item, index) }
				keyExtractor = { (item, index) => `${item._id}.${index}` }
			/>
		</View>	
	);
}

const styles = StyleSheet.create({});

export default RecyclerPlacesCarousel;