import React,{useEffect,useState} from 'react';

import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Circle, Marker,} from "react-native-maps";

import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';

import MapLayout from '../../components/frontLayouts/MapLayout';
import MapLayoutBar from '../../components/frontLayouts/MapLayoutBar';

import LatLng from '../../classes/LatLng';
import { getDistance, isPointWithinRadius } from 'geolib';

import { BASE, GET_DIRECTIONS } from '../../constants/ApiRoutes';

const MapTab = ({ navigation }) => {
	const [region, setRegion] = useState(undefined);
	const [position, setPosition] = useState(undefined);
	const [circleRadius, setCircleRadius] = useState(500);

	const [directionsData, setDirectionData] = useState([]);

	const [selectedPlace, setSelectedPlace] = useState(undefined);

	const [errorMsg, setErrorMsg] = useState(undefined);


	let selectedMarkerRef = undefined;

	const filteredData = position ? directionsData
		.filter(place => isPointWithinRadius(place.coordinate, position, circleRadius)) : [];

	const selectedMarker = selectedPlace ?
		<Marker coordinate={selectedPlace.coordinate} style={{ zIndex: 1 }}
			ref={ref => { selectedMarkerRef = ref }}>
			<View style={styles.selectedMarker}>
				<FontAwesome5 name="recycle" size={20} color={"white"} />
			</View>
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
			fetchDirections();
		})();
	},[]);

	const updateSelectedPlace = place => {
		setSelectedPlace(place);
		
		if (selectedMarkerRef !== undefined) { 
			selectedMarkerRef.hideCallout();
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

	const updateRegion = ({latitude, longitude}) => {
		setRegion({
			...region,
			latitude,
			longitude,
		});
	};



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
		padding: 16,
		width: Dimensions.get("window").width/2,

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
