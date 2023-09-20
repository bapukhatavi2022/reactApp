import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, Image, TextInput,Alert,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';


const  Upload= ({navigation}) => {
    const route = useRoute();
    const [driverName, setDriverName] = useState('');
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        getMenuStatus();
     },[]);

     const getMenuStatus = ()=>{
        if(route.name == 'New Driver'){
            setPersonAdd(true);
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
        const upload= ()=>{
        navigation.navigate('Unload');
    }
    
    const resetData = ()=>{
        setDriverName('');
    }

    
    const saveNewDriver= async()=>{
        setIsLoading(true);
        if(driverName.trim() == ''){ alert("Please Add Destination"); return false;}
        
        var data = {
          unload:driverName,
        }

        try {
            const response = await fetch('http://103.189.216.31:83/api/Unload?Unload="'+driverName+'"', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json();
            //console.log(responseData);
                if(responseData){
                    alert("Unload Saved Succesfully");
                    resetData();
                    setIsLoading(false);
                }else{
                    alert("Unload already exists");
                    setIsLoading(false);
                    return false;
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
        
    }
  return (
    <View style={styles.container}>
    <View style={styles.content}>
       
           <Text style={styles.label}>Destination:</Text>
           <View style={styles.picker}>
            <TextInput
            placeholder="Destination"
            value={driverName}
            onChangeText={setDriverName}            
            />
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

          <TouchableOpacity onPress={dashboard}>
          <Ionicons
          name='bus-sharp'
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>

          <TouchableOpacity onPress={upload}>
          <Ionicons
          name='cloud-download-outline'
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


export default Upload