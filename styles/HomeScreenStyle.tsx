import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  username: { fontWeight: "bold", fontSize: 20 },
  status: { fontSize: 13, color: "gray" },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  countBadge: {
    backgroundColor: "#eee",
    borderRadius: "100%",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  activeTab: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  inactiveTab: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: "#aaa",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 14,
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: { fontWeight: "bold", fontSize: 15 },
  message: { color: "gray", fontSize: 13 },
  meta: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: "#fff",
    fontSize: 10,
  },
  newChatBtn: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "#ff8000",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
  },
  newChatText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
