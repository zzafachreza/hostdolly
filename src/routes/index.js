import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Login,
  Home,
  Notification,
  Task,
  Account,
  TaskDetail,
  Register,
  AccountEdit,
  Laporan,
  MenuA,
  MenuB,
  MenuC,
  MenuD,
  MenuE,
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/BottomNavigator';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {


  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={Task} />
      <Tab.Screen name="Laporan" component={Laporan} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};


export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MenuA"
        component={MenuA}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuB"
        component={MenuB}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuC"
        component={MenuC}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuD"
        component={MenuD}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuE"
        component={MenuE}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,

        }}
      />


    </Stack.Navigator>
  );
}
