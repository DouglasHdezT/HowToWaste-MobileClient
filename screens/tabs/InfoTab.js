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

import { StyleSheet, View, Linking,TouchableOpacity } from 'react-native';
import ModedText from '../../components/text/ModedText';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InfoTab = props => {
	return (
		<View style={{flex: 1,backgroundColor:"#fff"}}>
			<View style={{alignItems:"center",marginTop:64}}>
				<View>
					<Avatar.Image style={styles.icon} size={192} source={require('../../assets/icon.png')}/>
				</View>
				<View>
					<ModedText big title >How to waste</ModedText>
				</View>
				<View>
					<ModedText style={{fontSize:20}}>AKHeroes {'\u00A9'}</ModedText>
				</View>
				<View>
					<ModedText style={{color:"#b2bec3"}}>Version 1.0.0</ModedText>
				</View>
			</View>
			<View style={{flexDirection:"row",justifyContent:"center"}}>
				<Avatar.Image style={styles.thumb} size={32} source={require('../../assets/team/douglas.jpeg')}/>
				<Avatar.Image style={styles.thumb} size={32} source={require('../../assets/team/Carmen.jpeg')}/>
				<Avatar.Image style={styles.thumb} size={32} source={require('../../assets/team/karla.jpeg')}/>
				<Avatar.Image style={styles.thumb} size={32} source={require('../../assets/team/carlos.jpeg')}/>
				<Avatar.Image style={styles.thumb} size={32} source={require('../../assets/team/Erika.jpeg')}/>
			</View>
			<View style={{alignItems:"center",marginTop:32}}>
				<TouchableOpacity
					onPress={()=>Linking.openURL('https://github.com/DouglasHdezT/HowToWaste')}
				>
					<Avatar.Image style={styles.icon} size={50} source={require('../../assets/github.png')}/>
				</TouchableOpacity>
				<ModedText style={{color:"#b2bec3"}}>MIT</ModedText>
			</View>
			<View style={{alignItems:"center",marginTop:32}}>
				<TouchableOpacity
					onPress={()=>Linking.openURL('https://douglashdezt.github.io/HowToWaste/\n')}
				>
					<MaterialCommunityIcons name="file-document-box-check" size={50} color="black" />
				</TouchableOpacity>
				<ModedText style={{color:"#b2bec3"}}>Documentación</ModedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	icon:{
		backgroundColor:"#fff",
	},
	thumb:{
		backgroundColor: "#fff",
		marginLeft:-8,
		borderWidth:1,
		borderColor:"#fff"
	}

});

export default InfoTab;
