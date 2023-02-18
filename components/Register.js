import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();



export default function Register({ navigation }) {

  const [securePassword, setSecurePassword] = useState(true)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")



const register = () => {
 
    setError("")

    let body = JSON.stringify({
      'username': email.toLowerCase(),
      'email': email.toLowerCase(),
      'first_name': firstName,
      'last_name': lastName,
      'password': password
    })

    fetch(`http://127.0.0.1:8000/api/createuser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:body
      })
      .then( res => res.json())
      .then( res => {
        navigation.navigate('Login');
      })
      .catch( error => console.log(error));

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

  return (


    <View style={styles.container} >
       <Image source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/islamlogo.png')} style={styles.islamImage} />
      <Text style={styles.label} >BetterMuslim</Text>

      <Text style={styles.qutoes}>Smile because it's sunnah muslim :)</Text>
      <TouchableOpacity disabled={!request}
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
          <Text style={{ color: 'grey', textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>─────────  or  ───────── </Text>
       

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        value={firstName}
        autoCapitalize={'none'}
        justifyContent={'flex-end'}
        padding={10}
      />

<TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
        value={lastName}
        autoCapitalize={'none'}
        justifyContent={'flex-end'}
        padding={10}
      />


      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize={'none'}
        justifyContent={'flex-end'}
        padding={10}
      />
    

  

  
      {/* <Text style={styles.label}>Password</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={securePassword}
        autoCapitalize={'none'}
        padding={10}
        marginBottom={10}
        textContentType="password"
        autoCompleteType="password"

      />

      {/* <Button
        onPress={() => register()}
        title="Register"
      >
        Register
      </Button> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => register()}
      >
        <Text style={styles.registertxt}>Register</Text>
      </TouchableOpacity>


      <TouchableOpacity >
        <Text style={styles.alract}>Already have an account?</Text>
        <Button
       onPress={() => navigation.navigate('Login')}
        title="Go to Login"
        color='green'
      >
      </Button>
      </TouchableOpacity>

    </View>
  );
}

Register.navigationOptions = screenProps => ({
  title: "Register",
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: '#fff',
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
  islamImage: {
    width: 70,
    height: 70,
    marginBottom: 50,

    resizeMode: 'contain',
  },
  label: {
    fontSize: 30,
    color: 'black',
    // padding: 10,
    fontWeight: 'bold',
    // fontFamily: 'Merriweather-Bold'
  },
  alract: {
    color: 'grey',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    textAlign: 'center',

  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    height: 50,
    margin: 5,
    width: "80%",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registertxt: {
    color: 'white',
    fontSize: 17,
    justifyContent: 'center',
    textAlign: 'center',

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
    color: 'grey',
    alignItems: 'center',
   
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
    color: 'grey',
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