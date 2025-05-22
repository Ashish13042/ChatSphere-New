// import React, { useState, useEffect, useCallback } from "react";
// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   View,
// } from "react-native";
// import {
//   GiftedChat,
//   Bubble,
//   Send,
//   InputToolbar,
//   Time,
// } from "react-native-gifted-chat";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import socket from "@/services/socket";
// import { useSelector } from "react-redux";
// import { RootState } from "@/features/store";
// import axiosInstance from "@/services/GlobalApi";
// import Header from "@/components/Header";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import styles from "@/styles/ChatScreenStyle";
// import { v4 as uuidv4 } from "uuid";
// import { getLocalItem } from "@/services/secureStorage";
// import * as ImagePicker from "expo-image-picker";

// const UserChatComponent = () => {
//   const { userName, name, image } = useLocalSearchParams();
//   const router = useRouter();

//   const { user } = useSelector((state: RootState) => state.user);
//   const currentUser = user?.userName;
//   const recipientUser = Array.isArray(userName)
//     ? userName[0]
//     : userName?.toString();

//   const roomId = [currentUser, recipientUser].sort().join("_");

//   const [messages, setMessages] = useState<any[]>([]);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (!currentUser || !recipientUser) return;

//     socket.emit("join-room", { roomId });

//     const handleReceiveMessage = (data: any) => {
//       const newMessage = {
//         _id: data.id || uuidv4(),
//         text: data.text || "",
//         createdAt: new Date(),
//         user: {
//           _id: data.sender === currentUser ? 1 : 2,
//           name: data.sender,
//           avatar:
//             data.sender === currentUser
//               ? user?.profileImage
//               : Array.isArray(image)
//               ? image[0]
//               : image,
//         },
//       };
//       setMessages((prev) => GiftedChat.append(prev, [newMessage]));
//     };

//     socket.on("receive-message", handleReceiveMessage);

//     return () => {
//       socket.off("receive-message", handleReceiveMessage);
//     };
//   }, [roomId, currentUser, recipientUser, user?.profileImage, image]);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axiosInstance.get(`/chat/${roomId}`);
//         const data = response.data as { messages: any[] };

//         const formattedMessages = data.messages.map((msg) => ({
//           _id: msg._id || msg.id || uuidv4(),
//           text: msg.text || "",
//           createdAt: new Date(msg.timestamp),
//           user: {
//             _id: msg.sender === currentUser ? 1 : 2,
//             name: msg.sender,
//             avatar:
//               msg.sender === currentUser
//                 ? user?.profileImage
//                 : Array.isArray(image)
//                 ? image[0]
//                 : image,
//           },
//         }));

//         setMessages(formattedMessages.reverse());
//       } catch (error) {
//         console.error("❌ Failed to fetch chat history:", error);
//       }
//     };

//     if (currentUser && recipientUser) {
//       fetchChatHistory();
//     }
//   }, [roomId, currentUser, recipientUser, user?.profileImage, image]);

//   const handleSend = useCallback(
//     async (newMessages: any[] = []) => {
//       if (!newMessages.length) return;

//       const message = newMessages[0];

//       const messageData = {
//         roomId,
//         sender: currentUser,
//         text: message.text,
//         type: "text",
//       };

//       setMessages((prev) => GiftedChat.append(prev, newMessages));
//       socket.emit("send-message", messageData);

//       try {
//         await axiosInstance.post("/chat/save", messageData);
//       } catch (error) {
//         console.error("❌ Failed to save message:", error);
//       }
//     },
//     [currentUser, roomId]
//   );

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: "images",
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       const fileName = uri.split("/").pop() || "image.jpg";
//       const match = /\.(\w+)$/.exec(fileName);
//       const type = match ? `image/${match[1]}` : `image`;

//       const formData = new FormData();
//       formData.append("file", {
//         uri,
//         name: fileName,
//         type,
//       } as any);

//       try {
//         const token = await getLocalItem("userToken");
//         console.log("File:", formData.get("file"));
//         const response = await axiosInstance.post("/upload/file", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const uploadRes = response.data;
//         if (response.status !== 200) {
//           throw new Error("Failed to upload image");
//         }
//         console.log("Image uploaded successfully:", uploadRes);
//         const filename = (uploadRes as { filename: string }).filename;
//         const messageData = {
//           roomId,
//           sender: currentUser,
//           type: "image",
//           uri: filename,
//         };

//         setMessages((prev) => [
//           ...prev,
//           { ...messageData, sender: "me" } as Message,
//         ]);
//         socket.emit("send-message", messageData);

//         await axiosInstance.post("/chat/save", messageData);
//       } catch (error) {
//         console.error("Failed to upload/send image:", error);
//       }
//     }
//   };

//   // Custom Components
//   const renderBubble = (props: any) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         left: { backgroundColor: "#f0f2f5", marginVertical: 0 },
//         right: { backgroundColor: "#2D9CDB", marginVertical: 0 },
//       }}
//       textStyle={{
//         left: { color: "#333", fontSize: 15 },
//         right: { color: "#fff", fontSize: 15 },
//       }}
//       timeTextStyle={{
//         left: { color: "#777" },
//         right: { color: "#e5e5e5" },
//       }}
//     />
//   );

//   const renderSend = (props: any) => (
//     <Send
//       {...props}
//       containerStyle={{
//         justifyContent: "center",
//         alignItems: "center",
//         paddingRight: 10,
//       }}
//     >
//       <MaterialIcons name="send" size={24} color="#2D9CDB" />
//     </Send>
//   );

//   const renderInputToolbar = (props: any) => (
//     <InputToolbar
//       {...props}
//       containerStyle={{
//         backgroundColor: "#fff",
//         borderTopWidth: 1,
//         borderTopColor: "#e5e5e5",
//         paddingVertical: 8,
//       }}
//       primaryStyle={{ alignItems: "center" }}
//     />
//   );

//   const renderTime = (props: any) => (
//     <Time
//       {...props}
//       timeTextStyle={{
//         left: { color: "#999", fontSize: 12 },
//         right: { color: "#e5e5e5", fontSize: 12 },
//       }}
//     />
//   );

//   const renderActions = useCallback(
//     (props: any) => (
//       <MaterialIcons
//         name="photo-camera"
//         size={24}
//         color="#000"
//         onPress={handlePickImage}
//       />
//     ),
//     []
//   );

//   return (
//     <View style={styles.container}>
//       <Header
//         image={Array.isArray(image) ? image[0] : image}
//         title={Array.isArray(name) ? name.join(", ") : name || "Chat"}
//         userName={Array.isArray(userName) ? userName.join(", ") : userName}
//         handleBack={() => router.back()}
//       />

//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#fff",
//           padding: 10,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           marginTop: -20,
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={100}
//         >
//           <GiftedChat
//             messages={messages}
//             onSend={(newMessages) => handleSend(newMessages)}
//             user={{
//               _id: 1,
//               name: currentUser,
//               avatar: user?.profileImage,
//             }}
//             renderBubble={renderBubble}
//             renderSend={renderSend}
//             renderInputToolbar={renderInputToolbar}
//             renderTime={renderTime}
//             alwaysShowSend
//             showUserAvatar
//             scrollToBottomComponent={() => (
//               <Ionicons name="chevron-down-circle" size={24} color="#2D9CDB" />
//             )}
//             placeholder="Type a message..."
//             textInputStyle={{
//               backgroundColor: "#f8f9fa",
//               borderRadius: 20,
//               paddingHorizontal: 16,
//               paddingVertical: 8,
//               marginLeft: 8,
//               borderWidth: 1,
//               borderColor: "#e9ecef",
//             }}
//             timeFormat="HH:mm"
//             dateFormat="MMMM D, YYYY"
//             isLoadingEarlier={false}
//             renderLoading={() => (
//               <View style={{ paddingVertical: 20 }}>
//                 <ActivityIndicator size="small" color="#2D9CDB" />
//               </View>
//             )}
//             renderActions={renderActions}
//           />
//         </KeyboardAvoidingView>
//       </View>
//     </View>
//   );
// };

// export default UserChatComponent;
