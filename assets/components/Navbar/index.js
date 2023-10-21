import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useFonts } from "expo-font"

import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

import ContactsScreen from "../../screens/ContactsScreen"
import AddServiceScreen from "../../screens/AddServiceScreen"
import Home from "../../screens/HomeScreen"

const Tab = createBottomTabNavigator()

function Navbar() {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#89CCC5",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#89CCC5",
          height: 90,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: "RalewayBold",
        },
        headerTintColor: "#272727",
        tabBarStyle: { borderTopColor: "#D7EBE9", borderTopWidth: 3 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Tela Inicial") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Serviços") {
            iconName = focused ? "book" : "book-outline"
          } else if (route.name === "Adicionar serviço") {
            iconName = focused ? "add-circle" : "add-circle-outline"
            size = 40
          } else if (route.name === "Financeiro") {
            iconName = focused ? "wallet" : "wallet-outline"
          } else if (route.name === "Configurações") {
            iconName = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Tela Inicial" component={Home} />
      <Tab.Screen name="Adicionar serviço" component={AddServiceScreen} />
      <Tab.Screen name="Serviços" component={ContactsScreen} />


    </Tab.Navigator>
  )
}

export default Navbar
