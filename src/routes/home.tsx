import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import moment from "moment-timezone";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../constants/constants";
import CurrentDay from "../components/currentDay";
import { AppContext } from "../contexts/app.context";

const HomePage = () => {
  const navigation = useNavigation();
  const { remindersList, setRemindersList } = useContext(AppContext);
  // const [remindersList, setRemindersList] = useState([]);

  const { isPending, error, data, isFetched } = useQuery({
    queryKey: ["repodata"],
    queryFn: () =>
      fetch(
        "https://raw.githubusercontent.com/eel-rides/react-native-assessment/main/reminders.json"
      ).then((res) => {
        return res.json();
      }),
  });

  if (isPending)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size={36} />
      </View>
    );

  if (error) return <Text>Some Error Occured</Text>;

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 10,
              flexDirection: "row",
            }}
          >
            <CurrentDay />
            <View style={{ paddingVertical: 4 }}>
              <TouchableOpacity
                style={styles.addRemTouchable}
                onPress={() =>
                  navigation.navigate("AddReminderScreen", { data: data })
                }
              >
                <Ionicons name="add" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={remindersList.length === 0 ? data : remindersList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <CardList item={item} index={index} />
            )}
            contentContainerStyle={styles.cardContentContainer}
            inverted={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const CardList = ({ item, index }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textTitle}>{item.title}</Text>
      {item.description && (
        <Text style={styles.textBody}>{item.description}</Text>
      )}
      {item.time && (
        <Text style={styles.textTime}>
          {moment.utc(item.time).tz(moment.tz.guess()).format("h:mm A, D MMMM")}
          {/* // .format("YYYY-MM-DD HH:mm:ss")} */}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.darkPrim,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.darkPrim,
    // alignItems: "center",
    justifyContent: "center",
  },
  cardContentContainer: {
    marginHorizontal: 8,
    marginTop: 6,
  },
  addRemTouchable: {
    backgroundColor: Colors.pastalGreen,
    padding: 8,
    borderRadius: 100,
  },
  cardContainer: {
    marginVertical: 6,
    backgroundColor: Colors.darkSec,
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "100%",
  },
  textTitle: {
    color: "white",
    fontSize: 20,
    marginVertical: 2,
  },
  textBody: {
    color: "grey",
    fontSize: 14,
  },
  textTime: {
    fontSize: 18,
    color: Colors.pastalGreen,
  },
});

export default HomePage;
