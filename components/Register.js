
import { StyleSheet, Text, View } from 'react-native';

export default function Register({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>register</Text>
      {/* <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      /> */}
     
    </View>
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
