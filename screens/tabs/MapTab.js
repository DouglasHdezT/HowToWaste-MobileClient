import React,{useEffect,useState} from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import MapView from "react-native-maps";
import Search from "../forms/Search";
import MapLayout from '../../components/frontLayouts/MapLayout';

const MapTab = props => {
	const [region, setRegion] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	console.log(region)
	
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			}

			let location = await Location.getCurrentPositionAsync({});
			setRegion({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta:  0.005,
				longitudeDelta: 0.005,
			});
		})();
	},[]);

	const updateRegion = (lat, lng) => {
		setRegion({
			...region,
			latitude: lat,
			longitude: lng,
		});
	};
	return (
		<View style={styles.container}>
			<MapView
				region={region}
				showsUserLocation
				loadingEnabled
				style={styles.mapStyle}
			/>
			<Search onSelectLocation={updateRegion}/>
			<MapLayout/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	mapStyle: {
		width:"100%",
		height:"110%"
	},
});

export default MapTab;
