import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
  // import { useNavigation } from '@react-navigation/native';




export default function Register({ navigation }) {
  // const navigation = useNavigation(); 
  const [securePassword, setSecurePassword] = useState(true)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


//   useEffect(() => {
//     getData();
//   }, [])

  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)
  }
//   const getData = async () => {
//     const token = await AsyncStorage.getItem('MR_Token');
//     if (token) props.navigation.navigate("Reminders");
//   }

  const register = () => {
 
    setError("")

    let body = JSON.stringify({
      'username': email.toLowerCase(),
      'email': email.toLowerCase(),
      'first_name': firstName,
      'last_name': lastName,
      'password': password
    })

    fetch(`http://127.0.0.1:8000/api/v1.0/user/createuser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:body
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError("User already exsist")
          throw res.json()
        }
      })
      .then( res => {
          saveData(res.token);
        //   props.navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error)
      })

  }



  return (


    <View style={styles.container} >
      <Text style={styles.label} >BetterMuslim</Text>

      <Text style={styles.qutoes}>Smile because it's sunnah muslim :)</Text>
      <Text style={styles.google}>Continue with Google</Text>
      <Text style={styles.apple}> Continue with Apple</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <View style={{flex: 1,   margin:40, height: 0.5, backgroundColor: 'grey'}} /> */}
        <View>
          <Text style={{ color: 'grey', textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>─────────  or  ───────── </Text>
        </View>
        {/* <View style={{flex: 1,  margin:40, height: 0.5, backgroundColor: 'grey'}} /> */}
      </View>

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

      <Button
        onPress={() => register()}
        title="Register"
      >
        Register
      </Button>
      <TouchableOpacity >
        <Text style={styles.viewText}>Already have an account?</Text>
        <Button
       onPress={() => navigation.navigate('Login')}
        title="Go to Login"
      >
        Go to Login
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
  label: {
    fontSize: 30,
    color: 'black',
    // padding: 10,
    fontWeight: 'bold',
    // fontFamily: 'Merriweather-Bold'
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