import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


  // let [fontsLoaded] = useFonts({
  //   'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
  //   // 'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


  

export default function Auth(props) {

  const [ username, setUsername] = useState("");
  const [ password, setPassword] = useState("");
  const [ regView, setRegView] = useState(false);

  useEffect(()=> {
    getData();
  }, [])

  const auth = () => {
    if (regView) {
      fetch(`http://192.168.1.5:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
      })
      .then( res => res.json())
      .then( res => {
        // console.log(res)
        setRegView(false);
      })
      .catch( error => console.log(error));
    } else {
      fetch(`http://192.168.1.5:8000/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password})
        })
        .then( res => res.json())
        .then( res => {
          saveData(res.token);
          console.log(res)

    
        //   props.navigation.navigate("MovieList");
        })
        .catch( error => console.log(error));
    }
  };
  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)
  }
  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if(token) props.navigation.navigate("MovieList");
  }
  const toggleView = () => {
    setRegView(!regView);
  }

 return  (

 
    <View style={styles.container} >
        <Text style={styles.label} >BetterMuslim</Text>
    
      <Text style={styles.qutoes}>Smile because it's sunnah muslim :)</Text>
      <Text style={styles.google}>Continue with Google</Text>
      <Text style={styles.apple}> Continue with Apple</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
  {/* <View style={{flex: 1,   margin:40, height: 0.5, backgroundColor: 'grey'}} /> */}
  <View>
    <Text style={{color: 'grey', textAlign: 'center',  paddingTop: 20, paddingBottom: 20}}>─────────  or  ───────── </Text>
  </View>
  {/* <View style={{flex: 1,  margin:40, height: 0.5, backgroundColor: 'grey'}} /> */}
</View>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize={'none'}
        justifyContent= {'flex-end'}
        padding={10}
      />
      {/* <Text style={styles.label}>Password</Text> */}
      <TextInput 
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={'none'}
        padding={10}
        marginBottom={10}
      />
      <Button  
 
      onPress={() => auth()} 
      title={regView ? "Register" : "Login"} />
      <TouchableOpacity  onPress={() => toggleView()}>
        {regView ? <><Text style={styles.viewFirstText}>Already have an account?</Text><Text  style={styles.viewText}> Go back to login </Text></> : 
        <><Text style={styles.viewFirstText}>Don't have an account? </Text><Text style={styles.viewText}> Create Account </Text></>}
        
      </TouchableOpacity>
      
    </View>
  );
 }

Auth.navigationOptions = screenProps => ({
  title: "Login",
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 30,
    color: 'black',
    // padding: 10,
    fontWeight: 'bold',
    fontFamily: 'Merriweather-Bold'
  },
  qutoes: {
    fontSize: 15,
    // color: 'grey',
     paddingTop: 15
  },
  input: {
    fontSize: 18,
    backgroundColor: 'white',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    width: "80%",
    borderRadius: 10,
    
  },
  viewText: {
    color: 'green',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    textAlign: 'center',
  
  },
  viewFirstText: {
    color: 'grey',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
  google: {
    fontSize: 14,
    marginTop: 45,
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'gray',
     borderWidth: 1,
    margin: 5,
    width: "80%",
    borderRadius: 10,
    textAlign: 'center',
    color: 'grey'
   
  },
  apple: {
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    // margin: 1,
    width: "80%",
    borderRadius: 10,
    textAlign: 'center',
    color: 'grey'
  },
  or: {
    padding: 22,
    color: 'grey'
  }
//   appButtonContainer: {
//     borderColor: 'gray',
//     borderWidth: 1,
//    margin: 5,
//    width: "80%",
//    borderRadius: 10,
//   }

});