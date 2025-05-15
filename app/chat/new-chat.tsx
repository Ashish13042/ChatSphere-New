import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import axiosInstance from '@/services/GlobalApi'
import styles from '@/styles/NewChatStyles'

const NewChat = () => {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    // Fetch recommendations on mount
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/users/recommendations')
        setRecommendations(res.data as any[])
      } catch (err) {
        setRecommendations([])
      }
      setLoading(false)
    }
    fetchRecommendations()
  }, [])

  const handleSearch = async (text: string) => {
    setSearch(text)
    if (text.length < 2) {
      setSearchResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    try {
      const res = await axiosInstance.get(`/users/search?query=${encodeURIComponent(text)}`)
      setSearchResults(res.data as any[])
    } catch (err) {
      setSearchResults([])
    }
    setSearching(false)
  }

  const renderUser = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.userCard}>
      <Image source={{ uri: item?.avatar }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.userName}</Text>
      </View>
      <TouchableOpacity style={styles.chatBtn}>
        <Text style={styles.chatBtnText}>Chat</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a New Chat</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search users..."
        value={search}
        onChangeText={handleSearch}
      />
      {searching && <ActivityIndicator style={{ marginVertical: 20 }} />}
      {search.length > 1 ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={renderUser}
          ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
        />
      ) : (
        <>
          <Text style={styles.subHeader}>Recommended for you</Text>
          {loading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : (
            <FlatList
              data={recommendations}
              keyExtractor={item => item.id}
              renderItem={renderUser}
              ListEmptyComponent={<Text style={styles.emptyText}>No recommendations.</Text>}
            />
          )}
        </>
      )}
    </View>
  )
}

export default NewChat