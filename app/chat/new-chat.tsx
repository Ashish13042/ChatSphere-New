import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axiosInstance from "@/services/GlobalApi";
import styles from "@/styles/NewChatStyles";
import { Ionicons } from "@expo/vector-icons"; // Add this import if using Expo

const NewChat = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch recommendations on mount
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/users/recommendations");
        setRecommendations(res.data as any[]);
      } catch (err) {
        setRecommendations([]);
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    try {
      const res = await axiosInstance.get(
        `/users/search?query=${encodeURIComponent(text)}`
      );
      setSearchResults(res.data as any[]);
    } catch (err) {
      setSearchResults([]);
    }
    setSearching(false);
  };

  const handleSendRequest = async (userId: string) => {
    try {
      await axiosInstance.post(`/requests/send-request/${userId}`);
      setRequestedUsers((prev) => [...prev, userId]);
    } catch (err) {
      alert("Failed to send friend request.");
    }
  };

  const renderUser = ({ item }: { item: any }) => {
    const isRequested = requestedUsers.includes(item?.id);
    return (
      <TouchableOpacity style={styles.userCard}>
        <Image source={{ uri: item?.avatar }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>@{item.userName}</Text>
        </View>
        <TouchableOpacity
          style={[styles.chatBtn, isRequested && { backgroundColor: "#ccc" }]}
          onPress={() => !isRequested && handleSendRequest(item?.id)}
          disabled={isRequested}
        >
          <Text style={styles.chatBtnText}>
            {isRequested ? "Requested" : "Request"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a New Chat</Text>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#bbb"
        />
      </View>
      {searching && <ActivityIndicator style={{ marginVertical: 20 }} />}
      {search.length > 1 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found.</Text>
          }
        />
      ) : (
        <>
          <Text style={styles.subHeader}>Recommended for you</Text>
          {loading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : (
            <FlatList
              data={recommendations}
              keyExtractor={(item) => item.id}
              renderItem={renderUser}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No recommendations.</Text>
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default NewChat;
