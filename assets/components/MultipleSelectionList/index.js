import * as React from "react"
import { Text, View, FlatList, TouchableOpacity } from "react-native"
import { useFonts } from "expo-font"
import { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { Dropdown } from "react-native-element-dropdown"

import styles from "./styles"

function MultipleSelectionList({
  selectedItems,
  setSelectedItems,
  setTotalValue,
}) {
  useFocusEffect(
    useCallback(() => {
      setSelectedItemsControl([])
    }, [])
  )
  useEffect(() => {
    handleFetchData()
  }, [])

  useEffect(() => {
    handleTotalValue()
  }, [selectedItems])

  const qtdOptions = [
    { label: "1", qtd: "1" },
    { label: "2", qtd: "2" },
    { label: "3", qtd: "3" },
  ]

  const [options, setOptions] = useState()
  const [selectedItemsControl, setSelectedItemsControl] = useState([])
  const { getItem } = useAsyncStorage("@lavanderia_app:items")

  const [loaded] = useFonts({
    RalewayBold: require("../../fonts/Raleway-Bold.ttf"),
    Montserrat: require("../../fonts/Montserrat-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  async function handleFetchData() {
    const response = await getItem()
    const data = response ? JSON.parse(response) : []
    setOptions(data)
  }

  function handleTotalValue() {
    const initialValue = 0
    setTotalValue(
      selectedItems
        .map((item) => item.item.value * item.qtd)
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        )
    )
  }

  const renderOptions = ({ item, index }) => {
    const { name, id, value } = item
    const isSelected =
      selectedItems.filter((item) => item.item.id === id).length > 0
    const showDropdown =
      selectedItemsControl.filter((item) => item.id === id).length > 0

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (showDropdown) {
              setSelectedItemsControl((prev) => prev.filter((i) => i.id !== id))
              setSelectedItems((prev) => prev.filter((i) => i.item.id !== id))
            } else {
              setSelectedItemsControl((prev) => [...prev, item])
            }
          }}
          style={[
            styles.item,
            showDropdown && styles.clickedItem,
            isSelected && styles.selectedItem,
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RalewayBold",
              color: "#272727",
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
        {showDropdown && (
          <Dropdown
            style={[
              showDropdown && styles.clickedDropdown,
              isSelected && styles.selectedDropdown,
            ]}
            selectedTextStyle={[
              showDropdown && {
                backgroundColor: "#D7EBE9",
                fontFamily: "Montserrat",
              },
              isSelected && { backgroundColor: "#89CCC5" },
            ]}
            containerStyle={[
              showDropdown && { backgroundColor: "#D7EBE9" },
              isSelected && { backgroundColor: "#89CCC5" },
            ]}
            data={qtdOptions}
            labelField="label"
            placeholder="Selecione a quantidade"
            valueField="qtd"
            value={
              (selectedItems.find((item) => item.item.id === id) || {}).qtd
            }
            onChange={(option) => {
              const qtd = option.qtd
              const newValue = {
                qtd,
                item,
              }
              if (isSelected) {
                setSelectedItems((prev) => prev.filter((i) => i.item.id !== id))
                setSelectedItems((prev) => [...prev, newValue])
              } else {
                setSelectedItems((prev) => [...prev, newValue])
              }
            }}
            itemContainerStyle={[
              showDropdown && { backgroundColor: "#D7EBE9" },
              isSelected && { backgroundColor: "#89CCC5" },
            ]}
            itemTextStyle={{ fontFamily: "Montserrat" }}
            activeColor={[
              showDropdown && { backgroundColor: "#D7EBE9" },
              isSelected && { backgroundColor: "#89CCC5" },
            ]}
          />
        )}
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={options}
        renderItem={renderOptions}
        scrollEnabled={false}
      />
    </View>
  )
}

export default MultipleSelectionList
