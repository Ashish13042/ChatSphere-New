import { View, Text } from 'react-native'
import React from 'react'
import MessageCard from "./MessageCard"; // Adjust the path according to your folder structure


const Chats = () => {
  return (
    <View style={{flex: 1}}> 
      <MessageCard/>
    </View>
  )
}

export default Chats