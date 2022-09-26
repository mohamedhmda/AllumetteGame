import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

function HomeScreen({ navigation }) {  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1F1'}}>
        <Button
          color="#841584"
          title="Start The Game"
          onPress={() => navigation.navigate('GameScreen')}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    
  })
  
export default HomeScreen;