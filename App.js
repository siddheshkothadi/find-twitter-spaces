import {useState} from 'react';
import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate("Game",{"score": 0,"rand": 9})}
          title="Start Game"
          color="#841584"
        />
    </View>
  );
}

function GameScreen({route, navigation }) {
  const {score, rand} = route.params
  //console.log(val);
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{padding: 10, fontSize: 60}}>
          {rand}
        </Text>
        <TextInput
         style={{borderColor:'gray',marginBottom:20, textAlign:'center',width: 250,padding: 10}}
         placeholder="Enter the number you see above"
         onChangeText={text => setText(text)}
         defaultValue={text}
       />
        <Button
          onPress={text==rand ? () =>navigation.push("Game",{"score":score+1,"rand": Math.floor(Math.random() * 10)}) : () =>navigation.popToTop()}
          title="Submit"
          color="#841584"
        />
        <Text style={{padding: 10, fontSize: 30}}>
          Score : {Number(JSON.stringify(score))}
        </Text>
    </View>
  );
}

// const [text, setText] = useState('');
//   return (
//     <View style={{padding: 10}}>
//       <TextInput
//         style={{height: 40}}
//         placeholder="Type here to translate!"
//         onChangeText={text => setText(text)}
//         defaultValue={text}
//       />
//       <Text style={{padding: 10, fontSize: 42}}>
//         {text.split(' ').map((word) => word && '🍕').join(' ')}
//       </Text>
//     </View>
//   );

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
