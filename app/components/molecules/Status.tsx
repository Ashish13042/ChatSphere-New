import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import MessageCard from "./MessageCard"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const Status = () => {
  const data = [
    {
      image: require("../../../assets/images/Ashishimage.png"),
      name: "Ashish Rawat",
      message: "10 minutes ago",
    },
    {
      image: require("../../../assets/images/Nishantimage.png"),
      name: "Nishant Kumar Singh",
      message: "Today, 7,29 am",
    },
    {
      image: require("../../../assets/images/Sahilimage.png"),
      name: "Sahil Sharma",
      message: "Yesterday, 5.47 pm",
    },
  ];

  return (
    <View style={{ flex: 1, gap: 10 }}>
       <MessageCard
            name={"Ashish Rawat"}
            message={"Tap to add status update"}
            image={require("../../../assets/images/Ashishimage.png")}
            logoComponent={<View style={styles.logoComponentContainer}>
              <Ionicons name="add-outline" size={moderateScale(20)} color="black" />
            </View>}

          />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageCard
            name={item?.name}
            message={item?.message}
            image={item?.image}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoComponentContainer: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(50),
    backgroundColor: "#3498db",
    position: "absolute",
    bottom: verticalScale(-5),
    right: scale(-5),
    borderWidth: 2,
    borderColor: "black",
     
  }
});

export default Status;
