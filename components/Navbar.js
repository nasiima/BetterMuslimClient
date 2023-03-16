import React from 'react';
import { View, Button, StyleSheet, Style} from 'react-native';


export default function Navbar ({navigation})  {


  return (
    <>
    <View style={styles.navbar}>
        
        
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
         <Button title="CardForm"  onPress={() => navigation.navigate('CardForm')} />
         <Button title="TheSlider" onPress={() => navigation.navigate('TheSlider')} />
         <Button  title="Charities" onPress={() => navigation.navigate('Charities')} />

     
    </View>
        </>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbar: {
        flexDirection: 'row',
         backgroundColor: '#fff', 
         padding: 10, 
         alignItems: 'center',    
         justifyContent: 'center'
    },
});

