import React from 'react';
import { useState, useEffect } from 'react';

import { StyleSheet,Alert, Modal,Pressable, Text, View, Button, Image } from 'react-native';

const GameScreen = ( {navigation, MatchesNumber} ) => {
    /* 
      States to manage the game
      * Allumettes state to get the number of matches
      * Winner state to determine the winner of the game
      * Player state to diffirenciate between Player turn and CPU turn
      * Modal state to show the modal after the game finish
    */
    const [Allumettes, setAllumettes] = useState(MatchesNumber)
    const [Winner, setWinner] = useState('')
    const [Player, setPlayer] = useState(true) // false for android
    const [modalVisible, setModalVisible] = useState(false);
  
    /*
      This function is called when ever its CPU turn,
      CPU always try to put the player in a loosing situation
      wich consist of leaving him with a number of matches 
      dividable by 4. Or play random if CPU is in a loosing situation.
    */
    const AndroidPlay = () => {
      var playable = Allumettes % 4
      if(playable === 0){
        playable = Math.floor(Math.random() * 3) + 1;
      }
      return playable
    }
  
    /*
      Function that controls the game, and decide :
      * player turn
      * Winner 
    */
    const jouer = (NbreAllumettes) => {
      setAllumettes(state => {
        var returnedState = state - NbreAllumettes
        if(returnedState < 0){
          returnedState =  0
        }
        if(returnedState === 0){
          setWinner(() => {
            setModalVisible(true)
            if(Player)
              return "You won"
            else 
              return "Android won"
          })
        }else{
          setPlayer(!Player)
        }
        return returnedState
      })
    }

    /*
      React hook that handles the CPU turn, it is dependent
      on the Allumettes state, cheks wether it's CPU turn or pass
    */
    useEffect(() => {
      if (!Player) {
          jouer(AndroidPlay())
      }
    }, [Allumettes])
    
    /*
      Variable to draw match on the screen
    */
    var indents = []
    for(let i = 1; i <= Allumettes; i++) {
      indents.push(<Image key={i} source={require('../assets/match.png')} />)
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View 
          style={{ 
            display: 'flex', flexDirection: 'row', 
            flexWrap: 'wrap', alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          {indents}
        </View>

        <View 
          style={{ 
            width: '60%',
            display: 'flex', flexDirection: 'row', 
            flexWrap: 'wrap', alignItems: 'center', 
            justifyContent: 'space-around', marginTop: 50
          }}
        >
          <Button
            color="#841584"
            title="1"
            disabled = {!Player}
            onPress={() => {
              jouer(1)
            }}
          />
          <Button
            color="#841584"
            title="2"
            disabled = {!Player}
            onPress={() => {
              jouer(2)
            }}
          />
          <Button
            color="#841584"
            title="3"
            disabled = {!Player}
            onPress={() => {
              jouer(3)
            }}
          />
        </View>
        
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{Winner}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    navigation.goBack('HomeScreen')
                  }}
                >
                  <Text style={styles.textStyle}>Restart</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        <Text style={styles.turn} >
          {Player && "player turn" || "Android turn"}
        </Text>
        
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    turn: {
      color: 'indigo',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
export default GameScreen;