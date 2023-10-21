import { Text, View, ScrollView } from "react-native"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"

import MainCard from "../../components/MainCard"
import ContactList from "../../components/ContactList"

import styles from "./styles"

function Home({ navigation }) {
  const [data, setData] = useState([])
  const { getItem, setItem, removeItem } = useAsyncStorage(
    "@lavanderia_app:clientes"
  )

  useFocusEffect(
    useCallback(() => {
      setData([])
      handleFetchData()
    }, [])
  )

  async function handleFetchData() {
    const todayDate = new Date().toLocaleDateString("pt-BR")
    const response = await getItem()
    const previousData = response ? JSON.parse(response) : []
    const data = previousData.filter((item) => item.selectedDate == todayDate)
    setData(data)
  }

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.homescreen}>
      <MainCard />
      <View>
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Entregas do Dia
        </Text>
      </View>
      <ScrollView style={styles.clientes}>
        <View>
          <ContactList data={data} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home
