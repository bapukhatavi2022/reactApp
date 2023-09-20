import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NewDriver from './components/NewDriver';
import NewOst from './components/NewOst';
import Upload from './components/Upload';
import NewVehicle from './components/NewVehicle';
import DriverEffectDate from './components/DriverEffectDate';
import OstVechuleLink from './components/OstVechuleLink';

export default function App() {
  const Route = createNativeStackNavigator();
  return (
     <NavigationContainer>
     <Route.Navigator initialRouteName='Balaji Transports'>
       <Route.Screen name="Balaji Transports" component={Home} options={{headerLeft: null,}}  />
       <Route.Screen name="Balaji Transport" component={Dashboard} options={{headerBackVisible:false}}  />
       <Route.Screen name="New Driver" component={NewDriver}/>
       <Route.Screen name="New Ost" component={NewOst}/>
      <Route.Screen name="Unload" component={Upload}/>
      <Route.Screen name="Vechile" component={NewVehicle}/>
      <Route.Screen name="Driver Effective Date" component={DriverEffectDate}/>
      <Route.Screen name="OST Vechile Link" component={OstVechuleLink}/>
     </Route.Navigator>
   </NavigationContainer>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
