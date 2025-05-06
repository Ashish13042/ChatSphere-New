import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { APIURL } from '@/services/APIURL';

const ProfilePage = () => {
  const [userName, setUserName] = useState('John Doe');
  const [userBio, setUserBio] = useState('Hello! I love chatting here.');
  const [profilePic, setProfilePic] = useState(require('../../assets/images/Profilesample.png'));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNameChange = (text: string) => setUserName(text);
  const handleBioChange = (text: string) => setUserBio(text);

  const handleProfilePicChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePic({ uri: result.assets[0].uri });
      }
    } else {
      alert('Permission to access media library is required!');
    }
  };

  const saveChanges = async () => {
    try {
      if (!profilePic.uri) {
        alert("Please select a profile picture.");
        return;
      }
  
      const formData = new FormData();
      formData.append("profileImage", {
        uri: profilePic.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });
  
      // You can append text data if needed:
      formData.append("userName", userName);
      formData.append("userBio", userBio);
  
      const response = await fetch(`${APIURL}/upload/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Note: You might need to adjust the headers based on your server's requirements
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Profile updated successfully!\nFile: " + data.filename);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong while saving your profile.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image source={profilePic} style={styles.profilePic} />
        </TouchableOpacity>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.bioLabel}>Bio:</Text>
        <TextInput
          style={styles.input}
          value={userBio}
          onChangeText={handleBioChange}
          placeholder="Write something about yourself..."
          multiline
        />
      </View>

      <View style={styles.nameSection}>
        <Text style={styles.nameLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
        />
      </View>

       <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
       </TouchableOpacity>
          
      

      {/* Modal for viewing and updating profile picture */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          >
            <Image source={profilePic} style={styles.modalImage} />
            <Button title="Update Image" onPress={handleProfilePicChange} color="#2D9CDB" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f6fc',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  bioSection: {
    marginBottom: 20,
  },
  bioLabel: {
    color: '#2D9CDB',
    marginBottom: 5,
  },
  nameSection: {
    marginBottom: 20,
  },
  nameLabel: {
    color: '#2D9CDB',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    color: '#000000',
    marginBottom: 10,
    backgroundColor: '#d6eaf8',
  },
  button:{
    backgroundColor: '#2D9CDB',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default ProfilePage;
