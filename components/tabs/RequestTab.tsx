import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axiosInstance from "@/services/GlobalApi";
import { Ionicons } from "@expo/vector-icons";

interface Request {
  _id: string;
  from: {
    _id: string;
    name: string;
    userName: string;
    profileImage: string;
  };
}

const RequestTab = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/requests");
        setRequests(res.data as Request[]);
        setFilteredRequests(res.data as Request[]);
      } catch (error) {
        setRequests([]);
        setFilteredRequests([]);
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    if (search.length < 2) {
      setFilteredRequests(requests);
      setSearching(false);
      return;
    }
    setSearching(true);
    const lower = search.toLowerCase();
    setFilteredRequests(
      requests.filter(
        (req) =>
          req.from.name.toLowerCase().includes(lower) ||
          req.from.userName.toLowerCase().includes(lower)
      )
    );
    setSearching(false);
  }, [search, requests]);

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.post(`/requests/${id}/approve`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axiosInstance.post(`/requests/${id}/reject`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const renderRequest = ({ item }: { item: Request }) => (
    <TouchableOpacity style={styles.userCard} activeOpacity={0.9}>
      <Image source={{ uri: item.from.profileImage }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.from.name}</Text>
        <Text style={styles.username}>@{item.from.userName}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.approveBtn]}
          onPress={() => handleApprove(item._id)}
        >
          <Text style={styles.actionBtnText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.rejectBtn]}
          onPress={() => handleReject(item._id)}
        >
          <Text style={styles.actionBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend Requests</Text>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search requests..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#bbb"
        />
      </View>
      {loading || searching ? (
        <ActivityIndicator style={{ marginVertical: 20 }} />
      ) : filteredRequests.length === 0 ? (
        <Text style={styles.emptyText}>No Requests Yet</Text>
      ) : (
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item._id}
          renderItem={renderRequest}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default RequestTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
    marginLeft: 20,
    color: "#222",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  searchIcon: {
    fontSize: 20,
    color: "#bbb",
    marginRight: 6,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    height: 44,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#4E6E5D",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 8,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 6,
  },
  approveBtn: {
    backgroundColor: "#4E6E5D",
  },
  rejectBtn: {
    backgroundColor: "#e74c3c",
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});
