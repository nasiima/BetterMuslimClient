import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '/Users/nasiima/Desktop/BetterMuslimClient/assets/login.jpg'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation, props }) {


  // const navigation = useNavigation(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, [])

  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)
  }
  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if (token) navigation.navigate("Reminders");
  }

  const login = () => {

    setError("")

    let body = JSON.stringify({
      'username': email.toLowerCase(),
      'password': password
    })

    fetch(`http://127.0.0.1:8000/api/loginuser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })

      .then(res => res.json())
      .then(res => {
        saveData(res.token);
        navigation.navigate('Reminders');
      })
      .catch(error => console.log(error));
  }


  // GOOGLE AUTH

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "614056587655-5uc97sg5l7f8qlsq3o6ubufr5b0vrn11.apps.googleusercontent.com",
    iosclientId: "614056587655-22isstt848ak449l64l4e8nnokrr2e3j.apps.googleusercontent.com"
    // androidClientId: ""
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();

    }
  }, [response, accessToken])



  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }
  // const ShowUserInfo = () => {
  //   if (user) {
  //     return (
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //         <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>Welcome</Text>
  //         <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
  //         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
  //       </View>
  //     )
  //   }
  // }

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  // const { onPress, title = 'Create Account' } = props;
  return (

<ImageBackground style={styles.imgbcg} source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/pexels-esra-afşar-15018493.jpg')} >
    <View  style={styles.container1}  >
      {/* <Image source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/islamlogo.png')} style={styles.islamImage} /> */}
      <Text style={styles.BetterMuslim} >BetterMuslim</Text>

      <Text style={styles.qutoe}>For surely, the reminding benefits the believers</Text>
      <Text style={styles.saw}> Prophet muhammad ﷺ</Text>
  
      <TouchableOpacity  
 
      disabled={!request}
        onPress={() => {
          promptAsync();
        }} style={styles.google}>
        <View style={styles.googleContent}>
          <View style={styles.googleIcon}>
            <Image source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/gmailIcon.png')} style={styles.googleImage} />
          </View>
          <Text style={styles.googletxt}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

 
      <View>
        <Text style={styles.or}>──────────  or  ────────── </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize={'none'}
        justifyContent={'flex-end'}
        padding={10}
        placeholderTextColor="#2f4f4f"
        backgroundColor='rgba(255,255,255,0.6)'
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
        placeholderTextColor="#2f4f4f"
        backgroundColor='rgba(255,255,255,0.6)'
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => login()}
      >
        <Text style={styles.logintxt}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity >
        <Text style={styles.dntact}>Don't have an account?</Text>

        <Button
          color='#32cd32'
          title="Create Account"
          fontWeight="bold"
          onPress={() => navigation.navigate('Register')} />
      </TouchableOpacity>

    </View>
    </ImageBackground>
  );
}

// Login.navigationOptions = screenProps => ({
//   title: "Login",
//   headerStyle: {
//     backgroundColor: 'black'
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     fontSize: 24
//   }
// })

const styles = StyleSheet.create({
  imgbcg: {
    flex: 1,
    
  },
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.50)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  islamImage: {
    width: 70,
    height: 70,
    marginBottom: 50,
    resizeMode: 'contain',
  },

  BetterMuslim: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    // fontFamily: 'Montserrat-Bold',
  },
  qutoe: {
    fontSize: 15,
    paddingTop: 15,
    color: 'white',
    // fontWeight: 'bold',
    
  },
  saw: {
    fontSize: 13,
    paddingTop: 3,
    color: 'white',
  },
  input: {
    fontSize: 15,
    backgroundColor: 'white',
    padding: 5,
    // borderColor: 'black',
    borderColor: 'rgba(158, 150, 150, .5)',
    borderWidth: 1,
    
    margin: 5,
    width: "80%",
    borderRadius: 10,
    color: `#2f4f4f`,

  },
  dntact: {
    color: 'white',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#32cd32',
    padding: 10,
    height: 50,
    margin: 5,
    width: "80%",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(158, 150, 150, .5)',
    color: '#7cfc00'
  },
  logintxt: {
    color: 'white',
    fontSize: 17,
    justifyContent: 'center',
    textAlign: 'center',

  },
  google: {
    fontSize: 14,
    marginTop: 45,
    backgroundColor: 'white',
    padding: 10,
    // borderColor: 'black',
    borderColor: 'rgba(158, 150, 150, .5)',
    borderWidth: 1,
    margin: 5,
    width: "80%",
    borderRadius: 10,
    textAlign: 'center',
    color: 'grey',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  googletxt: {
    fontSize: 14,
    textAlign: 'center',
    // color: 'grey',
    color: "#2f4f4f"
  },
  or: {
    padding: 22,
    color: 'white',
    textAlign: 'center', 
    paddingTop: 20, 
    paddingBottom: 20 
  }

});