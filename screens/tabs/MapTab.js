import React,{useEffect,useState} from 'react';

import { View, Text, StyleSheet,Dimensions } from 'react-native'
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';

import MapLayout from '../../components/frontLayouts/MapLayout';

import { getDistance, isPointWithinRadius } from 'geolib';
import LatLng from '../../classes/LatLng';

const dummyPoints = [
	new LatLng(13.6834,-89.2342),
	new LatLng(13.6837,-89.2330),
	new LatLng(13.6862,-89.2376),
	new LatLng(13.6869,-89.2310),
	new LatLng(13.6860,-89.2315),
	new LatLng(13.6809,-89.2260),
	new LatLng(13.6810,-89.2375),
] 

const MapTab = props => {
	const [region, setRegion] = useState(null);
	const [position, setPosition] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);

	const circleRadius = 500;
	
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
			
			const newPosition = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};

			setPosition(newPosition)

			setMarkers(updateMarkers(newPosition));
		})();
	},[]);

	const updateRegion = (lat, lng) => {
		setRegion({
			...region,
			latitude: lat,
			longitude: lng,
		});
	};

	const updateMarkers = (newPosition) => {
		return dummyPoints
			.filter(point => isPointWithinRadius(point, newPosition, circleRadius))
			.map((point, index) => <Marker key = {index} coordinate = { point } />);
	}
	return (
		<View style={styles.container}>
			<MapView
				region={region}
				showsUserLocation
				loadingEnabled
				followsUserLocation = {false}
				onUserLocationChange = { (event) =>  {
					const newPosition = {
						latitude: event.nativeEvent.coordinate.latitude,
						longitude: event.nativeEvent.coordinate.longitude
					}

					const delta = position ? getDistance(position, newPosition, 1) : 0;

					if(delta > 5){
						setPosition(newPosition);
						setMarkers(updateMarkers(newPosition));
					}
				} }
				onRegionChangeComplete = {region => setRegion(region)}
				style={styles.mapStyle}>
				
				{position && <Circle 
					center = {position}
					radius = {circleRadius}
					fillColor = "#CDDC3966"
				/>}
				{ markers }
			</MapView>
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
