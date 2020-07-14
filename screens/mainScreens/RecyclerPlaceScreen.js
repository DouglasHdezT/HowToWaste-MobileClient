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

import React, { useEffect, useState } from 'react';

import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';

import MapView, { Marker} from "react-native-maps";

import ModedText from '../../components/text/ModedText';
import DividerHorizontal from '../../components/design/DividerHorizontal';

import IconLabelRP from '../../components/labels/IconLabelRP';
import * as Linking from 'expo-linking';
import { showError } from '../../constants/FlashMessages';

const RecyclerPlaceScreen = ({ route, navigation }) => {
	const [mapRegion, setRegion] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta:  0.005,
		longitudeDelta: 0.005,
	});
	
	useEffect(() => {
		const { recyclerPlace } = route.params;
		if (recyclerPlace.directions.length > 0) {
			const direction = recyclerPlace.directions[0];
			setRegion({
				latitude: direction.latitude,
				longitude: direction.longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			});
		}
	}, []);

	const { recyclerPlace } = route.params;
	
	const services = (
		<View style={styles.box}>
			<ModedText title> Servicios </ModedText>
			<DividerHorizontal />
			{recyclerPlace.services.map((service, index) => <IconLabelRP key={index} text={service} type="service" />)}
		</View>
	);

	const contactWith = (
		<View style={styles.box}>
			<ModedText title> Contactar con </ModedText>
			<DividerHorizontal />
			{recyclerPlace.contactWith.map((contact, index) => <IconLabelRP key={index} text={contact} type="contact" />)}
		</View>
	);

	const phones = (
		<View style={styles.box}>
			<ModedText title> Teléfonos </ModedText>
			<DividerHorizontal />
			{recyclerPlace.phoneNumbers.map((phone, index) => (
				<IconLabelRP key={index}
					text={`${phone.phoneType}:\n${phone.phoneNumber}`}
					type="phone"
					iconColor="#1B5E20"
					onPress={async () => {
						try {
							const uri = `tel:${phone.phoneNumber}`;
							const canOpen = await Linking.canOpenURL(uri);

							if (canOpen) {
								Linking.openURL(uri);
							} else {
								showError("Error en el teléfono", "Algo malo ocurre en el número, no puedo realizar la llamada");
							}
						} catch (e) {
							showError("Error interno", "Algo malo ocurrió dentro de la app");
						}
					}} />
			))}
		</View>
	);

	const emails = (
		<View style={styles.box}>
			<ModedText title> Correos Electrónicos </ModedText>
			<DividerHorizontal />
			{recyclerPlace.emails.map((email, index) => (
				<IconLabelRP
					key={index}
					text={email}
					type="email"
					iconColor="#B71C1C"
					onPress={async () => {
						try {
							const uri = `mailto:${email}`;
							const canOpen = await Linking.canOpenURL(uri);

							if (canOpen) {
								Linking.openURL(uri);
							} else {
								showError("Error en el correo", "Algo malo ocurre en el correo, no puedo realizar esta acción");
							}
						} catch (e) {
							showError("Error interno", "Algo malo ocurrió dentro de la app");
						}
					}} />
			))}
		</View>
	);

	const webs = (
		<View style={styles.box}>
			<ModedText title> Sitios Web </ModedText>
			<DividerHorizontal />
			{recyclerPlace.webs.map((web, index) => <IconLabelRP key={index} text={web} type="web" />)}
		</View>
	);

	const materials = (
		<View style={styles.box}>
			<ModedText title> Materiales </ModedText>
			<DividerHorizontal />
			{recyclerPlace.materials.map((material, index) => <IconLabelRP key={index} text={material} type="material" />)}
		</View>
	);

	const directions = (
		<View style={styles.box}>
			<ModedText title> Direcciones </ModedText>
			<DividerHorizontal />
			{recyclerPlace.directions.map((direction, index) => (
				<IconLabelRP
					key={index}
					text={`${direction.name}:\n${direction.desc}`}
					type="direction"
					iconColor="#1A237E"
					onPress={() => {
						setRegion({
							latitude: direction.latitude,
							longitude: direction.longitude,
							latitudeDelta:  0.005,
							longitudeDelta: 0.005,
						});
					}} />
			))}
		</View>
	);

	const map = (
		<MapView
			style={styles.map}
			region={mapRegion}
			loadingEnabled
			onRegionChangeComplete={region=>{setRegion(region)}}>
			{recyclerPlace.directions.map((direction, index) => ( 
				<Marker
					key={index}
					coordinate={{
						latitude: direction.latitude,
						longitude: direction.longitude
					}} />
			)) }
		</MapView>
	);

	return (
		<View style={{flex: 1}}>
			<ModedText
				style={{margin: 16, color: "#1B5E20"}}
				title big center> {recyclerPlace.name} </ModedText>
			
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.mainContainer}>
					{recyclerPlace.services.length > 0 && services}
					{recyclerPlace.contactWith.length > 0 && contactWith}
					{recyclerPlace.phoneNumbers.length > 0 && phones}
					{recyclerPlace.emails.length > 0 && emails}
					{recyclerPlace.webs.length > 0 && webs}
					{recyclerPlace.materials.length > 0 && materials}
					{recyclerPlace.directions.length > 0 && directions}

					{recyclerPlace.directions.length > 0 && map}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		padding: 24
	},
	box: {
		marginVertical: 8,
	},
	footer: {
		minHeight: 56,
		backgroundColor: "red"
	},
	map: {
		width:"100%",
		height: Dimensions.get("window").height / 3,
	}
});

export default RecyclerPlaceScreen;