import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import MapLayout from '../../components/frontLayouts/MapLayout';
import MapLayoutBar from '../../components/frontLayouts/MapLayoutBar';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDistance, isPointWithinRadius } from 'geolib';
import LatLng from '../../classes/LatLng';
import Colors from "../../constants/Colors";

const dummyData = [
	{
		_id: "1",
		name: "Place 1",
		direction: "Somewhere in the endless sky",
		coordinate: new LatLng(13.6834,-89.2342),
	},

	{
		_id: "2",
		name: "Some fantanstic place 2",
		direction: "Here in your heart",
		coordinate: new LatLng(13.6837,-89.2330),
	},

	{
		_id: "3",
		name: "The real and only Recycler place",
		direction: "Wherever you want",
		coordinate: new LatLng(13.6862,-89.2376),
	},
	{
		_id: "4",
		name: "Recycler place",
		direction: "Nowhere",
		coordinate: new LatLng(13.6869,-89.2310),
	},
	{
		_id: "5",
		name: "Bottle",
		direction: "Megaton",
		coordinate: new LatLng(13.6860,-89.2315),
	},
	{
		_id: "6",
		name: "Melted Alum",
		direction: "1rst street outside you",
		coordinate: new LatLng(13.6809,-89.2260),
	},
	{
		_id: "7",
		name: "IDK place",
		direction: "Please ask me",
		coordinate: new LatLng(13.6810,-89.2375),
	}
]

const MapTab = props => {
	const [region, setRegion] = useState(null);
	const [position, setPosition] = useState(null);
	const [circleRadius, setCircleRadius] = useState(500);

	const [markersData, setMarkersData] = useState([]);
	const [selectedPlace, setSelectedPlace] = useState(undefined);

	const [errorMsg, setErrorMsg] = useState(null);

	const selectedMarker = selectedPlace ?
		<Marker coordinate = { selectedPlace.coordinate } style = {{zIndex:1}} >
			<View style={styles.selectedMarker}>
				<FontAwesome5 name="recycle" size={20} color={"white"} />
			</View>
		</Marker>
		: undefined;

	const markers = !position ? [] :
		markersData
		.map((place, index) => (
			<Marker  key = {index} coordinate = { place.coordinate }>
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
			setMarkersData(updateMarkers(newPosition));
		})();
	},[]);

	const updateRegion = ({latitude, longitude}) => {
		setRegion({
			...region,
			latitude,
			longitude,
		});
	};

	const updateMarkers = (newPosition, newRadius = undefined) => {
		return dummyData
			.filter(place => isPointWithinRadius(place.coordinate, newPosition, newRadius ? newRadius : circleRadius));
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
						setMarkersData(updateMarkers(newPosition));
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
			{markersData.length > 0 && <MapLayout
				onSelectOption = { place => {
					setSelectedPlace(place);
					updateRegion(place.coordinate);
				} }
				carrouselData = { markersData }/>}

			<MapLayoutBar
				circleRadius = { circleRadius }
				changeRadius = { value => {
					setMarkersData(updateMarkers(position, value));
					setCircleRadius(value);
				} }
				onSelectOption = { place => {
					setSelectedPlace(place);
					updateRegion(place.coordinate);
				} }
				options = { dummyData }/>
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
		backgroundColor: "red",
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

});

export default MapTab;
