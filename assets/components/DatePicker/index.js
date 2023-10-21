import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Text, View, Pressable, Platform } from "react-native"
import { useFonts } from "expo-font"
import { TextInput } from "react-native-paper"

function DatePicker({ placeholder, selectedDate, setSelectedDate }) {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate
      setDate(currentDate)

      if (Platform.OS === "android") {
        toggleDatePicker()
        setSelectedDate(currentDate.toLocaleDateString("pt-BR"))
      }
    } else {
      toggleDatePicker()
    }
  }

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={date}
          onChange={onChange}
        />
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            value={selectedDate}
            onChangeText={setSelectedDate}
            editable={false}
            placeholder={placeholder}
            mode="outlined"
            label={placeholder}
            outlineColor="#89CCC5"
            activeOutlineColor="#272727"
          />
        </Pressable>
      )}
    </View>
  )
}

export default DatePicker
