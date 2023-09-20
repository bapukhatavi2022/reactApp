import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, TextInput,ScrollView,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as Network from 'expo-network';

const  OstVechuleLink= ({navigation}) => {
    const route = useRoute(); 
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);
    
    const [vechile, setVechile] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
   
    const [selectedVechileValue, setSelectedVechileValue] = useState(null);
    const [filteredDataVechile, setFilteredDataVechile] = useState([]);
    const [searchTextVechile, setSearchTextVechile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        getMenuStatus();
        getTransport();
        getVechileNumbers();
     },[]);

   

     const getMenuStatus = ()=>{
        if(route.name == 'New Driver'){
            setPersonAdd(true);
         }
     }

     const getTransport = async()=>{
        setIsLoading(true);
    Network.getNetworkStateAsync()
    .then(networkState => {
      if (networkState.isInternetReachable) {
        // If the internet is reachable, make an HTTP request
        axios.get('http://103.189.216.31:83/api/Transport')
          .then(response => {
            // Handle the response here
           // console.log(response.data);
           setItems(response.data);
           setIsLoading(false);
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });
      } else {
        console.log('No internet connection available.');
      }
    })
    .catch(error => {
        console.error('Error checking network state:', error);
      });
    }
     const getVechileNumbers = async()=>{ 
   setIsLoading(true);
    Network.getNetworkStateAsync()
    .then(networkState => {
      if (networkState.isInternetReachable) {
        // If the internet is reachable, make an HTTP request 
        axios.get('http://103.189.216.31:83/api/Vehicle')
          .then(response => {
            // Handle the response here
           // console.log(response.data);
           setVechile(response.data);
           setIsLoading(false);
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });
      } else {
        console.log('No internet connection available.');
      }
    })
    .catch(error => {
        console.error('Error checking network state:', error);
      });
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

        const addNewVechile = ()=>{
            navigation.navigate('Vechile');
          }
      
          const ostVechileLink= ()=>{
            navigation.navigate('OST Vechile Link');
          }
      
          
      
    
        const addNewOst = ()=>{
            navigation.navigate('New Ost');
        }
    
    const resetData = ()=>{
        setSelectedVechileValue('');
        setSelectedValue('');
        setSearchText('');
        setSearchTextVechile('');

    }

    const saveNewDriver= async()=>{
        setIsLoading(true);
        var data = {
            VehicleNo:selectedVechileValue,
            TransportID:selectedValue
        }
       //console.log(data);

       //console.log('http://103.189.216.31:83/api/OSTVehicleLink?TransportID='+selectedValue+'&VehicleNo="'+selectedVechileValue+'"');
        try {
            const response = await fetch('http://103.189.216.31:83/api/OSTVehicleLink?TransportID='+selectedValue+'&VehicleNo="'+selectedVechileValue+'"', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json(); 
                if(responseData === "Transport and vehicle linked Succesfully"){
                    alert("Transport and vehicle link Saved Succesfully");
                    resetData();
                    setIsLoading(false);
                }else{
                    alert("Transport and vehicle link already exists");
                    setIsLoading(false);
                    return false;
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
    }

    const handleSearch = (text) => {
        setSearchText(text);
        const valuesArray = JSON.parse(items);
        const filteredResults = valuesArray.filter((item) =>
          item.TransportName.toLowerCase().includes(text.toLowerCase())
        );
    
        setFilteredData(filteredResults);
      };

      const handleSearchVechile = (text) => {
        setSearchTextVechile(text);
        const valuesArray = JSON.parse(vechile);
        const filteredResults = valuesArray.filter((item) =>
          item.VehicleNo.toLowerCase().includes(text.toLowerCase())
        );
    
        setFilteredDataVechile(filteredResults);
      }; 

   
  return (
    <View style={styles.container}>
    <ScrollView>
    <View style={styles.content}>
           <Text style={styles.label}>OST:</Text>
          
           <TextInput
                style={styles.searchInput}
                placeholder="Search by Name"
                value={searchText}
                onChangeText={(text) => handleSearch(text)}
            />
           
            <View style={styles.picker}>
           <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Select an option" value={null} />
                {filteredData.map((item) => (
                <Picker.Item key={item.TransportersId} label={item.TransportName} value={item.TransportersId} />
                ))}
                </Picker>
            </View>
            

            <Text style={styles.label}>Vechile:</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search by Vechile State"
                value={searchTextVechile}
                onChangeText={(text) => handleSearchVechile(text)}
            />


            <View style={styles.picker}>
            <Picker
                selectedValue={selectedVechileValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedVechileValue(itemValue)}>
                <Picker.Item label="Select an option" value={null} />
                {filteredDataVechile.map((item) => (
                <Picker.Item key={item.VehicleID} label={item.VehicleNo} value={item.VehicleNo} />
                ))}
      </Picker>
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
          name='git-compare-outline'
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
      searchInput: {
        margin:10,
        borderBottomWidth: 1,
        fontSize: 16,
        borderColor:'#BA434D',
        marginBottom: 20,
        justifyContent:'center',
        alignItems:'center'

      },
      
  });


export default OstVechuleLink