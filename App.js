import StackNavigator from "./assets/components/StackNavigator"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
const { getItem, setItem } = useAsyncStorage("@lavanderia_app:items")

function App() {
  useEffect(() => {
    handleFetchData()
  }, [])

  async function handleFetchData() {
    const response = await getItem()
    if (!response) {
      const deafaultItemList = [
        { id: 0, name: "Carrinho Tradicional", value: 75 },
        { id: 1, name: "Cadeirinha de carro", value: 70 },
        { id: 2, name: "Carrinho de gêmeo", value: 120 },
        { id: 3, name: "Bebê conforto", value: 60 },
        { id: 4, name: "Berço portátil", value: 70 },
        { id: 5, name: "Moisés", value: 60 },
        { id: 6, name: "Cadeirinha de descanso", value: 50 },
        { id: 7, name: "Cadeirinha de alimentação P", value: 50 },
        { id: 8, name: "Cadeirão de alimentação G", value: 70 },
        { id: 9, name: "Ninho", value: 40 },
        { id: 10, name: "Almofada de amamentação", value: 30 },
        { id: 11, name: "Tapete de atividades", value: 30 },
        { id: 12, name: "Colchão de berço padrão", value: 60 },
      ]

      setItem(JSON.stringify(deafaultItemList))
    }
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#2e8b57" }}
        text1Style={{
          fontSize: 15,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "#cd5c5c" }}
        text1Style={{
          fontSize: 15,
        }}
      />
    ),
  }
  return (
    <>
      <StackNavigator />
      <Toast config={toastConfig} />
    </>
  )
}

export default App
