import { ScrollView, View } from "react-native"
import { useFonts } from "expo-font"
import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import Toast from "react-native-toast-message"

import Form from "../../components/Form"
import styles from "./styles"

function AddService() {
  const [selectedDate, setSelectedDate] = useState()
  const [selectedItems, setSelectedItems] = useState([])
  const [clientName, setClientName] = useState()
  const [localName, setLocalName] = useState()
  const [discount, setDiscount] = useState()
  const [totalValue, setTotalValue] = useState(0)
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")
  const [clientContact, setClientContact] = useState()
  const [selectedList, setSelectedList] = useState()
  const [freightage, setFreightage] = useState()

  useFocusEffect(
    useCallback(() => {
      setSelectedDate("")
      setClientContact("")
      setSelectedItems([])
      setClientName("")
      setLocalName("")
      setDiscount("")
      setTotalValue(0)
      setSelectedList([])
      setFreightage("")
    }, [])
  )

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  function changeDate(brDate) {
    const piece = brDate.split("/")
    return new Date(piece[2], piece[1] - 1, piece[0])
  }

  function sortDateDescending(newData, previousData) {
    const newDate = changeDate(newData.selectedDate)
    const data = [
      ...previousData.filter((item) => changeDate(item.selectedDate) > newDate),
      newData,
      ...previousData.filter(
        (item) => changeDate(item.selectedDate) <= newDate
      ),
    ]

    return data
  }

  async function handleNew() {
    try {
      const id = uuid.v4()
      const newData = {
        id,
        clientName,
        clientContact,
        localName,
        selectedDate,
        selectedItems,
        totalValue,
        discount,
        freightage,
      }

      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      await setItem(JSON.stringify(sortDateDescending(newData, previousData)))
      Toast.show({
        type: "success",
        text1: "Serviço adicionado com sucesso",
        visibilityTime: 1500,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel adicionar o serviço!",
      })
    }
  }

  return (
    <View style={styles.container}>
      <Form
        clientName={clientName}
        setClientName={setClientName}
        clientContact={clientContact}
        setClientContact={setClientContact}
        localName={localName}
        setLocalName={setLocalName}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        discount={discount}
        setDiscount={setDiscount}
        totalValue={totalValue}
        setTotalValue={setTotalValue}
        handleSubmit={handleNew}
        buttonTitle="Adicionar serviço"
        setSelectedList={setSelectedList}
        selectedList={selectedList}
        freightage={freightage}
        setFreightage={setFreightage}
      />
    </View>
  )
}

export default AddService
