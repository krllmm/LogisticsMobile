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
      message: "Добрый день, что случилось?",
      sender: false
    },
    {
      message: "*Еще какое-то длинное сообщение о проблеме*",
      sender: true
    },
    {
      message: "*Подробное описание проблемы в отдельном сообщении*",
      sender: true
    },
    {
      message: "*Понимание проблемы и предложение по решению*",
      sender: false
    },
    {
      message: "*Подробные инструкции по решению проблемы*",
      sender: false
    },
    {
      message: "Добрый день.",
      sender: true
    },
    {
      message: "Добрый день, что случилось?",
      sender: false
    },
    {
      message: "*Еще какое-то длинное сообщение о проблеме*",
      sender: true
    },
    {
      message: "*Подробное описание проблемы в отдельном сообщении*",
      sender: true
    },
    {
      message: "*Понимание проблемы и предложение по решению*",
      sender: false
    },
    {
      message: "*Подробные инструкции по решению проблемы*",
      sender: false
    },
  ]);

  return (
    <>
      <Header title="Чат" />

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
