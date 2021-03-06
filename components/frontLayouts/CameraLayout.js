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

import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    useWindowDimensions,
    TouchableOpacity,
    Modal,
    Dimensions,
    Image,
    Picker,
    Button
} from 'react-native';

import {Ionicons, AntDesign} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import BaseStyles from '../../constants/BaseStyles';
import {FontAwesome} from '@expo/vector-icons';
import TopEndVectorButton from '../buttons/TopEndVectorButton';
import ModedText from '../text/ModedText';
import PacmanIndicator from "react-native-indicators/src/components/pacman-indicator";
import * as ImageManipulator from "expo-image-manipulator";
import {SaveFormat} from "expo-image-manipulator";
import {BASE} from "../../constants/ApiRoutes";

const CameraLayout = ({flipCameraAction, camera}) => {
    const [loading, isLoading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [height, setHeight] = useState("15%")
    const [modal, setModal] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [materials, setMaterials] = useState([])
    const [material, setMaterial] = useState(null)
    const [materialID, setMaterialID] = useState(null)
    const [objects, setObjects] = useState([])
    const [object, setObject] = useState(null)
    const [prediction, setPrediction] = useState({material:"",object:"",precision:0})

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
    const colorMaterial=(m)=>{
        switch (m) {
            case "Metales":
                return "#e74c3c"
            case "Vídrio":
                return "#2ecc71"
            case "Plástico":
                return "#f1c40f"
            case "Papel":
                return "#3498db"
            case "Orgánicos":
                return "#ccae62"
        }
    }
    const analisisComplete = (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flexDirection: "row"}}>
                    <FontAwesome name="circle" size={24} color={colorMaterial(prediction.material)} style={{marginEnd: 8}}/>
                    <ModedText title center centerV>{prediction.material}</ModedText>
                </View>
                <View style={{marginTop: 8}}>
                    <ModedText center>{prediction.object}</ModedText>
                    <ModedText center style={{marginTop:8}}>Probabilidad: {(prediction.precision * 100).toFixed(2)} %</ModedText>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingEnd: 8}}>
                <TouchableOpacity onPress={retry}>
                    <AntDesign name="downcircleo" size={30} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    )

    const pickMaterial = (itemValue) => {
        setMaterial(itemValue)
        let filter = materials.filter(m => m.name === itemValue)
        setMaterialID(filter[0]._id)
        setObjects(filter[0].items)
    }
    const takePicture = async () => {
        setHeight("35%")
        isLoading(true)
        if (camera) {

            let tempPhoto = await camera.takePictureAsync()
            const resize = await ImageManipulator.manipulateAsync(tempPhoto.uri, [{
                resize: {
                    width: 480,
                    height: 720
                }
            }], {
                compress: 0.75,
                format:ImageManipulator.SaveFormat.JPEG
            })
            setPhoto(resize)
            let fd = new FormData()
            fd.append("image", {
                name:"image.jpg",
                uri:resize.uri,
                type:"image/jpeg"
            })
            let classifyRes = await fetch(`${BASE}/api/classifier/classify`,{
                method:"POST",
                headers:{
                    "Content-Type": "multipart/form-data",
                },
                body:fd
            })
            if(classifyRes.ok){
                if(classifyRes.status === 200){
                    let data = await classifyRes.json()
                    isLoading(false)
                    setPrediction({
                        object:data.type,
                        material:data.material,
                        precision: data.probability
                    })
                    setComplete(true)
                }
            }else{
                if(classifyRes.status === 404) {
                    setModal(true)
                    setHeight("15%")
                    isLoading(false)
                }else {
                    setHeight("15%")
                    isLoading(false)
                }
            }

        }else{
            setHeight("15%")
            isLoading(false)
        }
    }
    const sendPrediction= async ()=>{
        let fd = new FormData()
        fd.append("image", {
            name:"image.jpg",
            uri:photo.uri,
            type:"image/jpeg"
        })
        fd.append("materialID",materialID)
        fd.append("item",object)
        let trainingRes = await fetch(`${BASE}/api/classifier/saveModel`,{
            method:"POST",
            headers:{
                "Content-Type": "multipart/form-data",
            },
            body:fd
        })
        if(trainingRes.ok){
            setModal(false)
        }else{
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
                   onRequestClose={() => setModal(false)}
                   animationType={"fade"}
            >
                <View style={styles.modalLayer}>
                    <View style={styles.modalPicker}>
						<View style={{ margin: 16 }}>
                            <View style={{flexDirection: "row"}}>
                                <ModedText title center centerV>¿Puedes decirme qué objeto es?</ModedText>
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
                                <View style={{marginTop: 16}}>
                                    <Button
                                        onPress={sendPrediction}
                                        disabled={!materialID && !object}
										title={"Enviar"} color={Colors.primaryColor} />
									<View style={{marginTop: 4}}>
										<Button
											onPress={() => setModal(false)}
											title = "Cerrar"/>
									</View>
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
        width: Dimensions.get('window').width - Dimensions.get('window').width / 10,
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
