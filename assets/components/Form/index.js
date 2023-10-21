import { Text, View, ScrollView } from "react-native"
import { useFonts } from "expo-font"
import { TextInput, Button } from "react-native-paper"

import styles from "./styles"
import DatePicker from "../../components/DatePicker"
import MultipleSelectionList from "../MultipleSelectionList"

function Form({
  clientName,
  setClientName,
  localName,
  setLocalName,
  selectedDate,
  clientContact,
  setClientContact,
  setSelectedDate,
  selectedItems,
  setSelectedItems,
  discount,
  setDiscount,
  totalValue,
  setTotalValue,
  handleSubmit,
  buttonTitle,
  setSelectedList,
  selectedList,
  setFreightage,
  freightage,
}) {
  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  const renderButton = () => {
    if (
      selectedDate != "" &&
      selectedItems.length != 0 &&
      clientName != "" &&
      localName != "" &&
      clientContact != ""
    ) {
      return true
    } else {
      return false
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Insira o nome do(a) cliente"
          mode="outlined"
          label="Nome do(a) cliente"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setClientName}
          value={clientName}
        />
        <TextInput
          placeholder="Insira o contato do(a) cliente"
          mode="outlined"
          inputMode="decimal"
          label="Contato do(a) cliente"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setClientContact}
          value={clientContact}
        />
        <TextInput
          placeholder="Insira o local de entrega"
          mode="outlined"
          label="Local da entrega"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setLocalName}
          value={localName}
        />
        <DatePicker
          placeholder={"Data de entrega"}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Text style={{ fontFamily: "RalewayBold", fontSize: 24 }}>
          Serviços
        </Text>
        <MultipleSelectionList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setTotalValue={setTotalValue}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
        />

        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          Valor Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValue)}
        </Text>
        <TextInput
          placeholder="Frete"
          mode="outlined"
          label="Frete"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setFreightage}
          inputMode="decimal"
          value={freightage}
        />
        <TextInput
          placeholder="Desconto?"
          mode="outlined"
          label="Desconto"
          outlineColor="#89CCC5"
          activeOutlineColor="#272727"
          onChangeText={setDiscount}
          inputMode="decimal"
          value={discount}
        />
        {isNaN(discount) ? (
          <Text
            style={{ color: "#e64330", fontFamily: "Montserrat", fontSize: 16 }}
          >
            Verifique se o disconto possui vírgula, espaço ou o sinal de menos
          </Text>
        ) : (
          <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
            Valor Final:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalValue - discount - freightage)}
          </Text>
        )}

        {renderButton() && (
          <Button
            mode="contained"
            buttonColor="#89CCC5"
            textColor="#272727"
            onPress={handleSubmit}
          >
            {buttonTitle}
          </Button>
        )}
      </View>
    </ScrollView>
  )
}

export default Form
