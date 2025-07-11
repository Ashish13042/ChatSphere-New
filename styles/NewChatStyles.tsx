import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#FFF", // Use expo-linear-gradient for real gradient
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#222",
    letterSpacing: 0.5,
    textShadowColor: "#ffe0c3",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    shadowColor: "#ff8000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 20,
    color: "#000",
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#ff8000",
    letterSpacing: 0.2,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 0.2,
  },
  username: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
    fontStyle: "italic",
  },
  chatBtn: {
    backgroundColor: "#ff8000",
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 9,
    marginLeft: 12,
    shadowColor: "#ff8000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 90,
    alignItems: "center",
  },
  chatBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 30,
    fontSize: 15,
    fontStyle: "italic",
  },
});

export default styles;