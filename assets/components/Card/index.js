import { View, Text, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"

import styles from "./styles"

function Card({ onPress, name, itens, value, date, local }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 16 }}>{name}</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{local}</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{date}</Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>
          {itens} {itens > 1 ? "itens" : "item"}
        </Text>
        <Text style={{ fontFamily: "Montserrat", fontSize: 12 }}>{value}</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <MaterialIcons name="attach-money" size={24} color="#E2958C" />
        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={24}
          color="green"
        />
      </View>
    </View>
  )
}

export default Card
