import { Text, View } from "react-native";
import { useFonts } from "expo-font"

import styles from './styles'

function MainCard() {
      const [loaded] = useFonts({
        RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
        Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
      })

      if (!loaded) {
        return null
      }

  return (
    <View style={styles.MainCard}>
      <Text style={{fontFamily: 'RalewayBold', fontSize: 24}}>Resumo do Dia</Text>
    </View>
  )
}

export default MainCard;