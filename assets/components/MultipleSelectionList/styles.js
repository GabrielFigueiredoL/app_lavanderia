import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#D7EBE9",
    marginVertical: 2.5,
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#D7EBE9",
  },
  selectedItem: {
    fontFamily: "Montserrat",
    backgroundColor: "#89CCC5",
    marginVertical: 0,
    marginTop: 5,
    padding: 15,
    borderRadius: 0,
    borderColor: "#89CCC5",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  selectedDropdown: {
    fontFamily: "Montserrat",
    backgroundColor: "#89CCC5",
    padding: 10,
    borderColor: "#89CCC5",
    borderWidth: 1,
  },
  clickedItem: {
    fontFamily: "Montserrat",
    backgroundColor: "#D7EBE9",
    marginVertical: 0,
    marginTop: 5,
    padding: 15,
    borderRadius: 0,
    borderColor: "#D7EBE9",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  clickedDropdown: {
    fontFamily: "Montserrat",
    backgroundColor: "#D7EBE9",
    padding: 10,
    borderColor: "#D7EBE9",
    borderWidth: 1,
  },
})

export default styles
