import React from 'react';

import { StyleSheet, View } from 'react-native';
import ModedText from '../../components/text/ModedText';

const infoTab = props => {
	return (
		<View style={{flex: 1, justifyContent: "center"}}>
			<ModedText title big> Info tab </ModedText>
		</View>		
	);
}

const styles = StyleSheet.create({});

export default infoTab;