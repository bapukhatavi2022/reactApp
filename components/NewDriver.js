import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, TextInput,Alert,ScrollView,ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
//import parsePhoneNumberFromString from 'libphonenumber-js/mobile';


const  NewDriver= ({navigation}) => {
    const route = useRoute();
    const [driverName, setDriverName] = useState('');
    const [driverMobile, setDriverMobile] = useState('');
    const [license, setlicense] = useState('');
    const [licenseError, setLicenseError] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('Image Name');
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        getMenuStatus();
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera and gallery permissions to make this work!');
            }
          })();
     },[]);

     const getMenuStatus = ()=>{
        if(route.name == 'New Driver'){
            setPersonAdd(true);
         }

     }

     const getPhoneValid = (phoneNumber)=>{
			const phoneNumberPattern = /^[6-9]\d{9}$/;
  			return phoneNumberPattern.test(phoneNumber);  
     }

     const validateLicense = (licenseNumber) => {
                // Define a regular expression pattern for Indian truck license
            const licensePattern = /^[A-Z]{2}\d{2}[A-Z0-9]{11}$/;

            // Test the license number against the pattern
            return licensePattern.test(licenseNumber);
      };

      const selectImage =async()=>{
        result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:false,
                    aspect:[4,3],
                    quality:0.75
                })
                if(!result.canceled){
                 // console.log(result.assets[0].uri);
                 setImage(result.assets[0].uri);
                 uploadImage(result.assets[0].uri);
                }
               
    }

    const addNewDriver = ()=>{
        navigation.navigate('New Driver');
      }
      const logout = async()=>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Balaji Transports' }],
          });
      }
      const dashboard =()=>{
        navigation.navigate('Balaji Transport');
        }
    
        const addNewOst = ()=>{
            navigation.navigate('New Ost');
        }

        const addNewVechile = ()=>{
          navigation.navigate('Vechile');
        }
    
        const ostVechileLink= ()=>{
          navigation.navigate('OST Vechile Link');
        }
    
        const upload= ()=>{
          navigation.navigate('Upload');
        }
    
        const driverEffectiveDate = ()=>{
          navigation.navigate('Driver Effective Date');
        }
    
    
    const resetData = ()=>{
        setDriverName('');
        setDriverMobile('');
        setlicense('');
        setMessage('Image Name');

    }

    const uploadImage = (imageUrl)=>{
      setIsLoading(true);
        const formData = new FormData();
      
        formData.append('photo', {
          uri: imageUrl,
          type: 'image/jpeg',
          name: 'dl.jpg',
    
        });
    
        axios
              .post('https://www.braveryes.com/logistics/upload.php', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(response => {
                //console.log(response.data);
                //if(response.data.name != ''){
                    setMessage(""+response.data.name+"");
                    setIsLoading(false);
                    //Alert.alert('Success', response.data.message);
                //}
              })
              .catch(error => {
                setIsLoading(false);
                Alert.alert('Error', 'Failed to upload photo');
              });
              
      };

    const saveNewDriver= async()=>{
      setIsLoading(true);

        if(driverName.trim() == ''){ alert("Please Add Driver Name");  setIsLoading(false); return false;}
        if(driverMobile.trim() == ''){ alert("Please Add Driver Mobile Number"); setIsLoading(false); return false;}
        if(license.trim() == ''){ alert("Please Add License Number"); setIsLoading(false); return false;}
        if(message== 'Image Name'){ alert("Please Upload Image"); setIsLoading(false); return false;}

        if (!getPhoneValid(driverMobile)) {
            alert("Mobile number is invalid, It should start with 6 or 7 or 8 or 9");
            return false;
          } 

          if (!validateLicense(license)) {
            alert("License is invalid");
            return false;
          }

       
        //validateLicense();
        var data = {
          DriverName:driverName,
          MobileNo:driverMobile,
          DLNo:license,
          //license_image:message,
        }
        //console.log(data);

        try {
            const response = await fetch('http://103.189.216.31:83/api/Driver?DriverName="'+driverName+'"&MobileNo="'+driverMobile+'"&DLNo="'+license+'"', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json();
            //console.log(responseData);
                if(responseData == 'Driver Name Saved Succesfully'){
                    alert("Driver Name Saved Succesfully");
                    resetData();
                    setIsLoading(false);
                }else{
                    alert("Driver Name already exists");
                    setIsLoading(false);
                    return false;

                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
           
        
    }
  return (
    
    <View style={styles.container}>
    <ScrollView>
    
    <View style={styles.content}>
    

           <Text style={styles.label}>Driver Name:</Text>
           <View style={styles.picker}>
            <TextInput
            placeholder="Driver Name"
            value={driverName}
            onChangeText={setDriverName}            
            />
            </View>


            <Text style={styles.label}>Mobile Number:</Text>
            <View style={styles.picker}>
            <TextInput
            placeholder="Driver Mobile Number"
            keyboardType="numeric" // Show numeric keyboard
            value={driverMobile}
            onChangeText={setDriverMobile} 
            maxLength={10} 
            />
            </View>

            <Text style={styles.label}>DL Nmber:</Text>
            <View style={styles.picker}>
            <TextInput
            placeholder="Example : KA6420170004122"
            value={license}
            onChangeText={setlicense}
            />
            {licenseError ? <Text style={styles.errorText}>{licenseError}</Text> : null}
            </View>

            <Text style={styles.label}>Upload DL:<Text>{message}</Text></Text>
            <View style={styles.browse}>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Browse Image</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.SaveRista}>    
                <Button
                    onPress={saveNewDriver}
                    title="Submit"
                    color="#BA434D"
                    accessibilityLabel="Rista Status" 
                />
            
                 <Button
                    onPress={resetData}
                    title="Reset"
                    color="#BA434D"
                    accessibilityLabel="Rista Status"
                />
            </View>

            {isLoading ? (
        <ActivityIndicator size="large" color="#BA434D" style={{}} />
      ) : (
        // Display your content or UI components here
        <Text></Text>
      )}

      </View>
     
    </ScrollView>
            <View style={styles.footer}>
          <TouchableOpacity onPress={dashboard}>
          <Ionicons
          name={showDashboard?'home-outline':'home-sharp'}
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>

          <TouchableOpacity onPress={addNewDriver}>
          <Ionicons
           name={showPersonAdd?'person-add-outline':'person-add-sharp'}
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>

          <TouchableOpacity onPress={addNewOst}>
          <Ionicons
           name={showBus?'add-circle-outline':'add-circle-sharp'}
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>

          <TouchableOpacity onPress={addNewVechile}>
          <Ionicons
          name='bus-sharp'
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>

          <TouchableOpacity onPress={ostVechileLink}>
          <Ionicons
          name='git-compare-sharp'
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>


          <TouchableOpacity onPress={logout}>
          <Ionicons
          name="log-out-sharp"
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>
      </View>
 
  </View>
  
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#fff',
      borderRadius:10,
      justifyContent:'center',
      
    },
    content: {
        flex: 1, // Takes remaining space
      },
    label: {
      fontSize: 16,
      marginBottom: 10,
      margin:10
      
    },
    
    
    SaveRista:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:100,
        marginTop: 20,
    },
    
      
      storedateValue:{
        
      },
      picker:{
        borderWidth: 1, 
        borderColor: '#BA434D', 
        borderRadius: 2,
        width:'95%',
        margin:10,
        height:45,
        justifyContent:'center',
      },
      icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      footer: {
        flexDirection:'row',
        height: 60, // Fixed footer height
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#BA434D',
        paddingHorizontal:1,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
      },
      bottom_tinyLogo:{
        width:35,
        height:35,
        borderRadius:10,
        margin:10
      },
      input: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderRadius:10,
        borderColor: '#fff',
        marginBottom: 10,
      },
      errorText: {
        color: '#fff',
        marginBottom: 10,
      },
      browse:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        padding:10,
        marginLeft:90,

      },
      button: {
        backgroundColor: '#BA434D',
        padding: 9,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });

export default NewDriver