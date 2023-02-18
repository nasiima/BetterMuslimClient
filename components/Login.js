import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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



  // const { onPress, title = 'Create Account' } = props;
  return (


    <View style={styles.container} >
      <Image source={require('/Users/nasiima/Desktop/BetterMuslimClient/assets/islamlogo.png')} style={styles.islamImage} />
      <Text style={styles.label} >BetterMuslim</Text>

      <Text style={styles.qutoes}>For surely, the reminding benefits the believers</Text>
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

 
      <View>
        <Text style={{ color: 'grey', textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>──────────  or  ────────── </Text>
      </View>
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
        secureTextEntry={true}
        autoCapitalize={'none'}
        padding={10}
        marginBottom={10}
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
          color='green'
          title="Create Account"
          onPress={() => navigation.navigate('Register')} />
      </TouchableOpacity>

    </View>
  );
}

Login.navigationOptions = screenProps => ({
  title: "Login",
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
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
    fontWeight: 'bold',
  },
  qutoes: {
    fontSize: 15,
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
  dntact: {
    color: 'grey',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
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

});