import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E293B" },
  header: {
    height: 100,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  chatSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    color: "#000",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 12,
    color: "#FFF",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginRight: 10,
  },
  messageList: {
    padding: 15,
    flexGrow: 1,
    backgroundColor: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 6,
    minWidth: 120,
    position: "relative",
  },
  imageBubble: {
    maxWidth: "80%",
    padding: 0,
    borderRadius: 20,
    marginVertical: 6,
    minWidth: 120,
    position: "relative",
  },
  myMessage: {
    backgroundColor: "#E3F2FD",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: "#ECEFF1",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  myMessageText: {
    color: "#0D47A1",
    fontSize: 15,
    textAlign: "right",
  },
  theirMessageText: {
    color: "#263238",
    fontSize: 15,
    textAlign: "left",
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: "#4E6E5D",
    borderRadius: 25,
    padding: 10,
  },
  imageMessage: {
    width: 180,
    height: 180,
    borderRadius: 20,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 10,
  },
  bubble: {
    width: 8,
    height: 8,
    backgroundColor: "#888",
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default styles;