import { Header } from "@/components/Header";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Chat {
  message: string,
  sender: boolean,
}

export default function Index() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState<Chat[]>([
    {
      message: "Добрый день.",
      sender: true
    },
    {
      message: "Не получится привезти заказ к указанному времени, потому что случилось ДТП и дорогу перекрыки на неопределенный срок.",
      sender: true
    },
    {
      message: "Это очень неприятно",
      sender: false
    },
    {
      message: "Что с могу сделать?",
      sender: false
    },
    {
      message: "Оповестите предприятие, что поставка задерживается",
      sender: true
    },
    {
      message: "Хорошо",
      sender: false
    },
    {
      message: "Спасибо",
      sender: true
    },
    // {
    //   message: "",
    //   sender: false
    // }
  ]);

  return (
    <>
      <Header title="Чат" backIcon={false}/>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView style={styles.chatbody} showsVerticalScrollIndicator={false}>
          {
            chat.map((message, index) => (
              <View key={index} style={{
                maxWidth: "60%", padding: 10,
                backgroundColor: "#969696", borderRadius: 12,
                marginBottom: 8,
                alignSelf: message.sender ? "flex-end" : "flex-start"
              }}>
                <Text style={{ fontSize: 18 }}>{message.message}</Text>
              </View>
            ))
          }
        </ScrollView>

        <View style={{ margin: 12 }}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Сообщение..."
          />
          <Pressable style={{ position: "absolute", right: 0, padding: 14 }}>
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 14,
    padding: 12,
    fontSize: 18,
  },
  chatbody: {
    marginHorizontal: 12,
  },
})
