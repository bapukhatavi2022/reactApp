import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';

const Dashboard = ({navigation}) => {
    const route = useRoute();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(1);
    const [showDashboard, setshowDashboard] = useState(false); 
    const [showPersonAdd, setPersonAdd] = useState(false);
    const [showBus, setShowBus] = useState(false);

    useEffect(()=>{
        getMenuStatus();
     },[]);

     const getMenuStatus = ()=>{
        if(route.name == 'Balaji Transport'){
            setshowDashboard(true);
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
      navigation.navigate('Unload');
    }

    const driverEffectiveDate = ()=>{
      navigation.navigate('Driver Effective Date');
    }

  return (
    <View style={styles.container}>
     <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>New Driver</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewDriver}>
          <Text style={styles.addButtonText}>Add Driver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>New OST</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewOst}>
          <Text style={styles.addButtonText}>Add OST</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Vechile</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewVechile}>
          <Text style={styles.addButtonText}>Add Vechile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Ost Vechile Link</Text>
        <TouchableOpacity style={styles.addButton} onPress={ostVechileLink}>
          <Text style={styles.addButtonText}>Vechile Link</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Unload</Text>
        <TouchableOpacity style={styles.addButton} onPress={upload}>
          <Text style={styles.addButtonText}>Unload</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Driver Effective Date</Text>
        <TouchableOpacity style={styles.addButton} onPress={driverEffectiveDate}>
          <Text style={styles.addButtonText}>Driver Effective Date</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.title}></Text>
        
          <Text style={styles.addButtonText}></Text>
        
      </View>

      <View style={styles.header}>
        <Text style={styles.title}></Text>
        
          <Text style={styles.addButtonText}></Text>
        
      </View>
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
          name="log-out"
          size={30}
          color="gray"
          style={styles.bottom_tinyLogo}
        />
          </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1, // Takes remaining space
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22.4,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderBottomColor: 'brown',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  addButton: {
    width:'30%',
    backgroundColor: '#BA434D',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  addButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign:'center'
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333333',
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

export default Dashboard;
