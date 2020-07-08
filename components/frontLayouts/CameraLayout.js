import React, {useState, useEffect} from 'react';

import {StyleSheet, View, useWindowDimensions, TouchableOpacity, Modal, Dimensions, Image, Picker,Button} from 'react-native';

import {Ionicons, AntDesign} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import BaseStyles from '../../constants/BaseStyles';
import {FontAwesome} from '@expo/vector-icons';
import TopEndVectorButton from '../buttons/TopEndVectorButton';
import ModedText from '../text/ModedText';
import PacmanIndicator from "react-native-indicators/src/components/pacman-indicator";

const CameraLayout = ({flipCameraAction, camera}) => {
    const [loading, isLoading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [height, setHeight] = useState("15%")
    const [modal, setModal] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [materials, setMaterials] = useState([])
    const [material, setMaterial] = useState(null)
    const [objects, setObjects] = useState([])
    const [object, setObject] = useState(null)

    useEffect(() => {
        fetchMaterials()
    }, [])

    const fetchMaterials = async () => {
        try {
            let res = await fetch("http://192.34.60.67/api/material/getAll", {method: "GET"})
            let data = await res.json()
            setMaterials(data.materials)
        } catch (e) {
        }
    }

    const retry = () => {
        setComplete(false)
        setHeight("15%")
    }
    const loadingSpinner = () => {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <PacmanIndicator color={Colors.primaryColor} size={50}/>
            </View>
        )
    }
    const analisisComplete = (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flexDirection: "row"}}>
                    <FontAwesome name="circle" size={24} color="#b2bec3" style={{marginEnd: 8}}/>
                    <ModedText title center centerV>Plastico</ModedText>
                </View>
                <View style={{marginTop: 8}}>
                    <ModedText>Pajilla</ModedText>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingEnd: 8}}>
                <TouchableOpacity onPress={retry}>
                    <AntDesign name="downcircleo" size={30} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    )

    const pickMaterial =(itemValue) => {
        setMaterial(itemValue)
        let filter = materials.filter(m=>m.name===itemValue)
        console.log(filter)
        setObjects(filter[0].items)
    }
    const takePicture = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync()
            setPhoto(photo)
            //setHeight("35%")
            //isLoading(true)
            setModal(true)
        }
    }
    return (
        <View style={styles.container}>
            <TopEndVectorButton
                width={48}
                height={48}
                onPress={flipCameraAction}>
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.primaryColor,
                }}>
                    <Ionicons name="md-reverse-camera" size={25} color="white"/>
                </View>
            </TopEndVectorButton>

            <View style={{
                ...styles.infoLayout,
                height: height,
                borderTopStartRadius: useWindowDimensions().width / 5,
                borderTopEndRadius: useWindowDimensions().width / 5,
            }}>
                {loading ? loadingSpinner() : <></>}
                {complete ? analisisComplete : <></>}

                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={{justifyContent: "center", alignItems: "center"}}>
                        <AntDesign name="scan1" size={32} color="black"/>
                        <ModedText title center centerV>Escanear</ModedText>
                    </TouchableOpacity>
                </View>

            </View>
            <Modal transparent={true}
                   visible={modal}
                   onRequestClose={()=>setModal(false)}
                   animationType={"fade"}
            >
                <View style={styles.modalLayer}>
                    <View style={styles.modalPicker}>
                        <View style={{margin: 16}}>
                            <View>
                                <ModedText title center centerV>¿Puedes decirme que objeto es?</ModedText>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center", marginTop: 16}}>
                                {photo ?
                                    <Image
                                        style={styles.imageCircle}
                                        source={{uri: photo.uri}}
                                    /> : <></>
                                }
                            </View>
                            <View style={{margin: 16}}>
                                <View>
                                    <Picker
                                        onValueChange={pickMaterial}
                                        selectedValue={material}
                                    >
                                        <Picker.Item label={"Categoría"} value={null}/>
                                        {
                                            materials.map((i, k) => {
                                                return <Picker.Item label={i.name} value={i.name} key={k}/>
                                            })
                                        }
                                    </Picker>
                                </View>
                                <View>
                                    {objects !== null ?
                                        <Picker
                                            onValueChange={(itemValue) => setObject(itemValue)}
                                            selectedValue={object}

                                        >
                                            <Picker.Item label={"¿Que objeto es?"} value={null}/>
                                            {
                                                objects.map((i, k) => {
                                                    return <Picker.Item label={i} value={i} key={k}/>
                                                })
                                            }
                                        </Picker>
                                        : <></>}
                                </View>
                                <View style={{marginTop:16}}>
                                    <Button title={"Enviar"} color={Colors.primaryColor} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",

        position: "absolute",
        top: 0,
        left: 0,

        justifyContent: "flex-end",
        alignItems: "center",

        backgroundColor: "transparent"
    },
    infoLayout: {
        width: "100%",
        paddingTop: 10,

        justifyContent: "flex-end",

        borderWidth: 15,
        borderBottomWidth: 0,
        borderColor: "white",

        backgroundColor: "white",
        ...BaseStyles.materialShadowUp
    },
    modalLayer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalPicker: {
        width: Dimensions.get('window').width - Dimensions.get('window').width / 8,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20
    },
    imageCircle: {
        width: 64,
        height: 64,
        borderRadius: 64 / 2
    }
});

export default CameraLayout;
