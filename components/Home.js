import React, { useState } from 'react';
import {  View, TextInput, Text, Button, StyleSheet ,ImageBackground,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Home = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const toggleShowPassword= ()=>{
    setShowPassword(!showPassword);

  }

  const handleSubmit = async() => {
   // validateEmail();
   // validatePassword();
        setIsLoading(true);
        if(email.trim() === ''){ alert("Please Add Username");   setIsLoading(false); return false;}
        if(password.trim() === ''){ alert("Please Add Password"); setIsLoading(false); return false;}
        let data = {   
          Username:email,
          password:password
        }
       try{
        //http://103.189.216.31:83/api/Login?Username='+email+'&password='+password+'
            const response = await fetch('http://103.189.216.31:83/api/Login?Username='+email+'&password='+password+'', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Replace with your data
        });
           const responseData = await response.json();
          if (responseData === "Login Succesfull") {
                setIsLoading(false);    
                navigation.navigate('Balaji Transport');
           }else{
                alert("Login Failed");
                setIsLoading(false);
                return false;
           }
       }catch (error) {
        alert(error);
        console.error('Error data:', error);
      }

  }; 
 
  return (
    <ImageBackground source={require('../components/images/truck2.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
        <TextInput
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
            
            style={styles.input}
        />
       
         
        <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        />
         <TouchableOpacity
        style={styles.iconContainer}
        onPress={toggleShowPassword}
      >
        <Ionicons
          name={showPassword ?'ios-eye':'ios-eye-off'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <Button title="Login" color="#b91f23"  onPress={handleSubmit} />
        </View>
        {isLoading ? (
        <ActivityIndicator size="large" color="#BA434D" style={{}} />
      ) : (
        // Display your content or UI components here
        <Text></Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  image: {
    flex:1,
    justifyContent: 'flex-end',
  },
  iconContainer: {
    position:'absolute',
    right:18,
    paddingTop:20

  },
});

export default Home;
