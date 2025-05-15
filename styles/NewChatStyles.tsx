import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ff8000',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  username: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  chatBtn: {
    backgroundColor: '#ff8000',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginLeft: 10,
  },
  chatBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 30,
    fontSize: 15,
  },
})

export default styles