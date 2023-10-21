import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { Button, Text } from "react-native-paper"
import { ScrollView, View } from "react-native"
import Toast from "react-native-toast-message"

import styles from "./styles"
import ServiceDetail from "../../components/ServiceInfos"
import ContactInfos from "../../components/ContactInfos"

function ContactDetailsScreen({ route, navigation }) {
  const contactData = route.params.item
  const { getItem, setItem } = useAsyncStorage("@lavanderia_app:clientes")
  console.log(contactData)

  async function handleRemove(id) {
    try {
      const response = await getItem()
      const previousData = response ? JSON.parse(response) : []

      const data = previousData.filter((item) => item.id !== id)
      setItem(JSON.stringify(data))
      navigation.navigate("RootScreen")
      Toast.show({
        type: "success",
        text1: "Serviço excluido com sucesso",
        visibilityTime: 1500,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Não foi possivel excluir o serviço!",
      })
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <ContactInfos title="Nome do cliente" value={contactData.clientName} />
        <ContactInfos
          title="Telefone do cliente"
          value={contactData.clientContact}
        />
        <ContactInfos title="Local de entrega" value={contactData.localName} />
        <ContactInfos
          title="Data de entrega"
          value={contactData.selectedDate}
        />
        <View>
          <Text variant="titleLarge" style={{ fontFamily: "RalewayBold" }}>
            Serviços
          </Text>
          {contactData.selectedItems.map((item) => (
            <ServiceDetail
              qtd={item.qtd}
              name={item.item.name}
              value={item.item.value}
              key={item.item.id}
            />
          ))}
        </View>
        <View>
          <ServiceDetail name={"Valor Total"} value={contactData.totalValue} />
          <ServiceDetail name={"Frete"} value={contactData.freightage} />
          <ServiceDetail name={"Discontos"} value={contactData.discount} />
          <ServiceDetail
            name={"Valor Final"}
            value={
              contactData.totalValue -
              contactData.discount -
              contactData.freightage
            }
          />
        </View>

        <Button
          mode="contained"
          buttonColor="#cd5c5c"
          textColor="#F8F8F8"
          style={styles.button}
          onPress={() => handleRemove(contactData.id)}
        >
          Excluir Contato
        </Button>
      </View>
    </ScrollView>
  )
}

export default ContactDetailsScreen
