import {useState} from 'react';
import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({route,navigation }) {
	let txt="";
	if(route.params!=null){
		txt="Previous score: "+route.params.score;
	}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate("Game",{"score": 0,"rand1":Math.floor(Math.random() * 10),"rand2":Math.floor(Math.random() *10)})} 
          title="Start Game"
          color="#841584"
        />
	  <Text>{txt}</Text>
    </View>
  );
}

function GameScreen({route, navigation }) {
  const {score, rand1,rand2} = route.params
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{padding: 10, fontSize: 60}}>{rand1}+{rand2}</Text>
        <TextInput
	  keyboardType='numeric'  
         style={{borderColor:'gray',marginBottom:20, textAlign:'center',width: 250,padding: 10}}
         placeholder="Enter the addition"
         onChangeText={text => setText(text)}
         defaultValue={text}
       />
        <Button
          onPress={text==rand1+rand2 ? () =>navigation.push("Game",{"score":score+1,"rand1": Math.floor(Math.random() * 10),"rand2":Math.floor(Math.random()*10)}) : () =>navigation.navigate("Home",{"score":score})}
          title="Submit"
          color="#841584"
        />
        <Text style={{padding: 10, fontSize: 30}}>
          Score : {Number(JSON.stringify(score))}
        </Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title:"Home"}}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{title:"Game"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
