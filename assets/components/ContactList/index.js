import { FlatList, Text, View } from "react-native"
import Card from "../Card"

import styles from "./styles"

const ListaVazia = () => {
  return (
    <View style={styles.container}>
      <Text>Nenhuma entrega encontrada...</Text>
    </View>
  )
}

function ContactList({ data, navigation }) {
  return (
    <FlatList
      data={data}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      ListEmptyComponent={ListaVazia}
      renderItem={({ item }) => (
        <Card
          name={item.clientName}
          local={item.localName}
          date={item.selectedDate}
          itens={item.selectedItems.length}
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.totalValue - item.discount)}
          onPress={() => {
            navigation.navigate("Detalhes", { item })
          }}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ContactList
