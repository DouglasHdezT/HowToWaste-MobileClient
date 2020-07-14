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

import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Circle, Marker, Callout} from "react-native-maps";

import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import MapLayout from '../../components/frontLayouts/MapLayout';
import MapLayoutBar from '../../components/frontLayouts/MapLayoutBar';
import ModedText from '../../components/text/ModedText';

import LatLng from '../../classes/LatLng';
import { getDistance, isPointWithinRadius } from 'geolib';

import { BASE, GET_DIRECTIONS, GET_ONE_RP } from '../../constants/ApiRoutes';
import { showError } from '../../constants/FlashMessages';

const MapTab = ({ navigation }) => {
	const [region, setRegion] = useState(undefined);
	const [position, setPosition] = useState(undefined);
	const [circleRadius, setCircleRadius] = useState(1000);

	const [directionsData, setDirectionData] = useState([]);
	const [selectedPlace, setSelectedPlace] = useState(undefined);

	const [errorMsg, setErrorMsg] = useState(undefined);
	const [hasPermission, setHasPermission] = useState(undefined);



	let selectedMarkerRef = undefined;

	const filteredData = position ? directionsData
		.filter(place => isPointWithinRadius(place.coordinate, position, circleRadius)) : [];

	const selectedMarker = selectedPlace ?
		<Marker
			onCalloutPress={() => { navigateToRP(selectedPlace._id);}}
			coordinate={selectedPlace.coordinate}
			style={{ zIndex: 1 }}
			ref={ref => { selectedMarkerRef = ref }}>

			<View style={styles.selectedMarker}>
				<FontAwesome5 name="recycle" size={20} color={"white"} />
			</View>
			
			<Callout style={styles.labelMarker}>
				<ModedText
					style={{ flex: 5, marginEnd: 4}}>
					{selectedPlace.name.length > 30 ? `${selectedPlace.name.substr(0, 30)}...` : selectedPlace.name}
				</ModedText>
				<View style={{flex: 1, height: 50, justifyContent: "center", alignItems: "center"}}>
					<AntDesign name="rightcircleo" size={24} color="black" />
				</View>
			</Callout>
		</Marker>
		: undefined;

	const markers = !position ? [] :
		filteredData
		.map((place, index) => (
			<Marker key={index}
				coordinate={place.coordinate}
				onPress={e => { updateSelectedPlace(place)	}}>
				<View style={styles.marker}>
					<FontAwesome5 name="recycle" size={20} color={"white"} />
				</View>
			</Marker>
			));

	
	
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();

			setHasPermission(status === 'granted');
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			} else { 
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
				fetchDirections();
			}
		})();
	},[]);

	const updateSelectedPlace = place => {
		setSelectedPlace(place);
		
		if (selectedMarkerRef !== undefined) { 
			selectedMarkerRef.hideCallout();
			selectedMarkerRef.redrawCallout();
		}
	}
	
	const fetchDirections = async () => {
		try{
			const response = await fetch(`${BASE}${GET_DIRECTIONS}`);
			
			if(response.ok){
				const data = await response.json();
				setDirectionData(lineupDirections(data.places));
			}
		}catch(e){
			console.log(e);
		}
	}
	
	const navigateToRP = async (_id) => {
		try {
			const response = await fetch(`${BASE}${GET_ONE_RP}/${_id}`);
			
			if (response.ok) {
				const recyclerPlace = await response.json();
				navigation.navigate("RecyclerPlace", { recyclerPlace: recyclerPlace.place });
			} else { 
				showError("Error de conexión", `La repuesta ha sido negativa de parte del servidor.`);
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	const updateRegion = ({latitude, longitude}) => {
		setRegion({
			...region,
			latitude,
			longitude,
		});
	};

	if (hasPermission === undefined) {
		return <View style={{flex: 1}} />;
	}
	if (hasPermission === false) {
		return (
			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
				<ModedText>No tengo permisos para mapas</ModedText>
			</View>
		);
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
					}
				} }
				onRegionChangeComplete = {region => setRegion(region)}
				style={styles.mapStyle}>

				{position && <Circle
					center = {position}
					radius = {circleRadius}
					fillColor = "#CDDC3966"
					strokeWidth = { 1 }
					strokeColor = "#CDDC39"
				/>}

				{ markers }
				{ selectedMarker }
			</MapView>

			{filteredData.length > 0 && <MapLayout
				onPressBannerText={_id => { 
					navigateToRP(_id);
				} }
				onSelectOption = { place => {
					updateSelectedPlace(place);
					updateRegion(place.coordinate);
				}}
				carrouselData = { filteredData }/>}

			<MapLayoutBar
				circleRadius = { circleRadius }
				changeRadius = { value => {
					setCircleRadius(value);
				}}
				onPressLocation={() => { 
					setRegion({...position, latitudeDelta: 0.01, longitudeDelta: 0.01});
				} }
				onSelectOption = { place => {
					updateSelectedPlace(place);
					updateRegion(place.coordinate);
				} }
				options = { directionsData }/>
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
	selectedMarker:{
		backgroundColor: "#3F51B5",
		width:45,
		height:45,
		display:"flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius:45/2,
		elevation:8
	},
	marker:{
		backgroundColor: "rgb(106,176,76)",
		width:40,
		height:40,
		display:"flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius:40/2,
		elevation:4
	},
	labelMarker: {
		position: "absolute",
		flex: -1,

		padding: 8,
		width: Dimensions.get("window").width / 2,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	}
});

const lineupDirections = (data) => {
	if(!data || data.length < 1) return [];

	let linedupData = [];

	data.forEach(rp => {
		const directionsBuff = rp.directions.map(direction => {
			return {
				_id: rp._id,
				name: rp.name,
				direction: direction.desc,
				coordinate: new LatLng(direction.latitude, direction.longitude)
			}
		});

		linedupData = [...linedupData, ...directionsBuff];
	});

	return linedupData;
}

export default MapTab;
