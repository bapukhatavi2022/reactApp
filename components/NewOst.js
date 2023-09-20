import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, TextInput,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';


const  NewOSt= ({navigation}) => {
    const route = useRoute();
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);
    const [driverName, setDriverName] = useState('');
    const [driverMobile, setDriverMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        getMenuStatus();
     },[]);

     const getMenuStatus = ()=>{
        if(route.name == 'New Ost'){
            setShowBus(true);
         }
     }

     


     const addNewDriver = ()=>{
        navigation.navigate('New Driver');
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
    
    

    
    const resetData = ()=>{
        setDriverName('');
        
    }

    const saveTransportName= async()=>{
      setIsLoading(true);
        let data ={
          TransportName:driverName
        }
        const url = 'http://103.189.216.31:83/api/Transport?TransportName="'+driverName+'"';
        // console.log(url);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json();
            //console.log(responseData);
                if(responseData == "Transport Name Saved Succesfully"){
                    alert("Transport Name Saved Succesfully");
                    resetData(); 
                    setIsLoading(false);
                }else{
                    alert("Transport Name already exists");
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
           <Text style={styles.label}>Transport:</Text>
           <View style={styles.picker}>
           <TextInput
            placeholder="Transport Name"
            value={driverName}
            onChangeText={setDriverName} 
            />
            </View>

            
            <View style={styles.SaveRista}>    
                <Button
                    onPress={saveTransportName}
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
        <ActivityIndicator size="large" color="#BA434D" />
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
    },
    content: {
        flex: 1, // Takes remaining space
      },
    label: {
        fontSize: 16,
        marginBottom: 10,
        margin:10
      
    },
    selectedText: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
     
    },
    selectbox:{
        backgroundColor: "#fff", 
        borderRadius: 10,
    },
    SaveRista:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:100,
        marginTop: 20,
    },
    
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        margin:10,
        backgroundColor:'#ffff',
        borderRadius:10,
    },
    
    item: {
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 6, 
      },
      title: {
        fontSize: 20,
      },
      itemStyle:{
        margin:2,
        padding:2,
       color:'#fff',
        marginRight:130
      },
     
      
      listView:{
      flex:1,
      flexDirection: 'column',
      borderRadius:15,
      backgroundColor: '#fff',
      borderBottomColor: 'brown',
      borderBottomWidth: StyleSheet.hairlineWidth,
      margin:10,
      padding:10,
    
      },
      
      
      storedateValue:{
        
      },
      picker:{
        borderWidth: 1, 
        borderColor: '#BA434D', 
        borderRadius: 2,
        width:'95%',
        height:45,
        margin:10
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
     
     
      
  });

export default NewOSt