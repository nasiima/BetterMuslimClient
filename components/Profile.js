
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';


function Profile({ navigation }) {

    let token = null;


    const handleLogout = async () => {
        token = await AsyncStorage.getItem('MR_Token');
        console.log("Current token before removing: ", token);
        try {
            await AsyncStorage.removeItem('MR_Token');
            const newToken = await AsyncStorage.getItem('MR_Token');
            console.log("New token after removing: ", newToken);
            navigation.navigate("Login");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <Navbar navigation={navigation} />
        <View style={styles.container}>
            <Text style={styles.text}>Hello User, this is your profile!</Text>
            <Button title="Logout" onPress={handleLogout} />

        </View>
        </>
    );
}


Profile.navigationOptions = screenProps => ({
    title: "Profile",
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default Profile;

