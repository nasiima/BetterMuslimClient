import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';

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
      body: body
    })
      .then(res => res.json())
      .then(res => {
        navigation.navigate('Login');
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

  return (

    <ImageBackground style={styles.imgbcg} source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/medina.jpeg')} >
      <View style={styles.container} >
        <Text style={styles.BetterMuslim} >BetterMuslim</Text>

        <Text style={styles.qutoe}>I have been sent to perfect good character</Text>
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
        <Text style={styles.or}>──────────  or  ────────── </Text>


        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          autoCapitalize={'none'}
          justifyContent={'flex-end'}
          padding={10}
          backgroundColor='rgba(255,255,255,0.6)'
          borderColor='rgba(158, 150, 150, .5)'
          placeholderTextColor="#2f4f4f"
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={lastName}
          autoCapitalize={'none'}
          justifyContent={'flex-end'}
          padding={10}
          backgroundColor='rgba(255,255,255,0.6)'
          borderColor='rgba(158, 150, 150, .5)'
          placeholderTextColor="#2f4f4f"
        />


        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
          justifyContent={'flex-end'}
          padding={10}
          backgroundColor='rgba(255,255,255,0.6)'
          placeholderTextColor="#2f4f4f"
          borderColor='rgba(158, 150, 150, .5)'
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
          backgroundColor='rgba(255,255,255,0.6)'
          placeholderTextColor="#2f4f4f"
          borderColor='rgba(158, 150, 150, .5)'

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
            color='#32cd32'
          >
          </Button>
        </TouchableOpacity>

      </View>
    </ImageBackground>
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
    fontSize: 24
  }
})

const styles = StyleSheet.create({
  imgbcg: {
    flex: 1,
  },
  container: {
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
  alract: {
    color: 'white',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderColor: 'rgba(158, 150, 150, .5)'

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
    color: "#2f4f4f"
  },
  or: {
    padding: 22,
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  }
  //   appButtonContainer: {
  //     borderColor: 'gray',
  //     borderWidth: 1,
  //    margin: 5,
  //    width: "80%",
  //    borderRadius: 10,
  //   }

});