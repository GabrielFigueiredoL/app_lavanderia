import { View } from "react-native"
import { useFonts } from "expo-font"
import { Text } from "react-native-paper"

function ContactInfos({ title, value }) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }
  return (
    <View>
      <Text variant="titleLarge" style={{ fontFamily: "RalewayBold" }}>
        {title}
      </Text>
      <Text variant="headlineSmall" style={{ fontFamily: "Montserrat" }}>
        {value}
      </Text>
    </View>
  )
}

export default ContactInfos
