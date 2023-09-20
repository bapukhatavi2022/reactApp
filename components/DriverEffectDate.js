import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, TextInput,ScrollView,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
//import moment from 'moment-timezone';
import { Picker } from '@react-native-picker/picker';


const  DriverEffectDate= ({navigation}) => {
    const route = useRoute();
    const [driverName, setDriverName] = useState('');
    const [driverMobile, setDriverMobile] = useState('');
    const [license, setlicense] = useState('');
    const [message, setMessage] = useState('Image Name');
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);
    const [vechile, setVechile] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [driversItems,setDriversItems] = useState([]);
    const [filteredDataVechile, setFilteredDataVechile] = useState([]);
    const [searchTextVechile, setSearchTextVechile] = useState('');
    const [items, setItems] = useState([]);
    const [selectedVechileValue, setSelectedVechileValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(()=>{
        getMenuStatus();
        //showLoading();
        getDrivers();
        getVechiles();
     },[]);
     

     const getMenuStatus = ()=>{
        if(route.name == 'New Driver'){
            setPersonAdd(true);
        }
     }

    //  const showLoading = ()=>{
    //     setIsLoading(true); 
    //  }

     const getDrivers = async()=>{
        setIsLoading(true);
        try {
            const response = await fetch('http://103.189.216.31:83/api/Driver', {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json(); 
            //console.log(responseData);
                if(responseData){
                    setDriversItems(responseData);
                    setIsLoading(false);   
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
     }

     const getVechiles = async()=>{
        setIsLoading(true);
        try {
            const response = await fetch('http://103.189.216.31:83/api/Vehicle', {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json(); 
           // console.log(responseData);    
            if(responseData){
                    setItems(responseData);   
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
     }

     const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        const originalDateTime = date;
        //const indianDateTime = moment(originalDateTime).tz('Asia/Kolkata').format();
    
        //console.log('Indian Time:', indianDateTime);
        const dateTime = new Date(originalDateTime);
        const datePart = dateTime.toISOString().split('T')[0];
        setDate(datePart);
        //console.warn("A date has been picked: ", datePart);
        hideDatePicker();
      };


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
      
          const upload= ()=>{
            navigation.navigate('Upload');
          }
      
          const driverEffectiveDate = ()=>{
            navigation.navigate('Driver Effective Date');
          }
      
    
        const addNewOst = ()=>{
            navigation.navigate('New Ost');
        }
    
    const resetData = ()=>{
        setDate('');
        setSelectedValue('');
        setSelectedVechileValue('');
        setSearchText('');
        setSearchTextVechile('');

    }

  

    const saveNewDriver= async()=>{
        setIsLoading(true);
        const currentDate = new Date();
        //if(date === ''){ alert("Please Add Date"); setIsLoading(true); return false;}
        if(selectedValue === null){ alert("Please Add Driver Name");  setIsLoading(false); return false;}
        if(selectedVechileValue === ''){ alert("Please Add Vechile"); setIsLoading(false);return false;}
       
        var data = {
            DriverID:selectedValue,
            VehicleId:selectedVechileValue,
            date:currentDate,
        }
        //console.log(data);
        try {
            const response = await fetch('http://103.189.216.31:83/api/DriverEffectiveDate?DriverID="'+selectedValue+'"&VehicleId="'+selectedVechileValue+'"&date="'+currentDate+'"', {
                method: 'POST', 
                headers: {
                Accept: 'application/json',
                 'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
            const responseData = await response.json();
                if(responseData === "Driver start date Saved Succesfully"){
                    alert("Driver start date Saved Succesfully");
                    resetData();
                    setIsLoading(false);
                   
                }else{
                    alert("Driver start date already exists");
                    setIsLoading(false);
                    return false;
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
           }
        
    }

    const handleSearch = (text) => {
        setSearchText(text);
        const valuesArray = JSON.parse(driversItems);
        const filteredResults = valuesArray.filter((item) =>
          item.NAme.toLowerCase().includes(text.toLowerCase())
        );
    
        setFilteredData(filteredResults);
      };

      const handleSearchVechile = (text)=>{
        setSearchTextVechile(text);
        const valuesArrayVechile = JSON.parse(items);
        const filteredResults = valuesArrayVechile.filter((item) =>
          item.VehicleNo.toLowerCase().includes(text.toLowerCase())
        );
    
        setFilteredDataVechile(filteredResults);
      }
    
  return (
    <View style={styles.container}>
    <ScrollView>
        <View style={styles.content}>

           <Text style={styles.label}>Driver:</Text>
           <TextInput
                style={styles.searchInput}
                placeholder="Search by Driver Name"
                value={searchText}
                onChangeText={(text) => handleSearch(text)}
            />
           <View style={styles.picker}>

           <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                <Picker.Item label="Select an option" value={null} />
                {filteredData.map((item) => (
                <Picker.Item key={item.DriverId} label={item.NAme} value={item.DriverId} />
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
                <Picker.Item key={item.VehicleID} label={item.VehicleNo} value={item.VehicleID} />
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

          <TouchableOpacity onPress={driverEffectiveDate}>
          <Ionicons
          name='person-circle-outline'
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
      date:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
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


export default DriverEffectDate