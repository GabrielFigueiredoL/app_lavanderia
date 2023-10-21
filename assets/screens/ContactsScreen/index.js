import { Text, View, ScrollView } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

import styles from "./styles"
import ContactList from "../../components/ContactList"

const options = [
  { label: "Todas as Entregas", value: "1" },
  { label: "Entregas Pendentes", value: "2" },
  { label: "Entregas Concluidas", value: "3" },
]

function ContactsScreen({ navigation }) {
  const [value, setValue] = useState("1")
  const [data, setData] = useState([])
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")

  useFocusEffect(
    useCallback(() => {
      handleFetchData()
    }, [])
  )

  async function handleFetchData() {
    const response = await getItem()
    const data = response ? JSON.parse(response) : []
    setData(data)
    console.log(data)
  }

  return (
    <View style={styles.contactscreen}>
      <Dropdown
        selectedTextStyle={{ fontSize: 24, fontFamily: "RalewayBold" }}
        containerStyle={{ borderRadius: 20 }}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => {
          setValue(item.value)
        }}
      />
      <ScrollView style={styles.clientes}>
        <View style={styles.cards}>
          <ContactList data={data} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  )
}

export default ContactsScreen
