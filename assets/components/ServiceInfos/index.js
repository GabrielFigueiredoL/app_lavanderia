import { View } from "react-native"
import { Text } from "react-native-paper"
import styles from "./styles"

function ServiceDetail({ name, value, qtd }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {qtd && (
          <Text variant="titleSmall" style={{ fontFamily: "Montserrat" }}>
            {qtd}
          </Text>
        )}
        <Text variant="titleSmall" style={{ fontFamily: "Montserrat" }}>
          {name}
        </Text>
      </View>
      <Text variant="titleSmall" style={{ fontFamily: "Montserrat" }}>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </Text>
    </View>
  )
}

export default ServiceDetail
