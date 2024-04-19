import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

import { getCurrentDate } from "../utils/dateTime";
import { Colors } from "../constants/constants";
import { AppContext } from "../contexts/app.context";

const AddReminderScreen = ({ route }) => {
  const { remindersList, setRemindersList } = useContext(AppContext);
  const [reminders, setReminders] = React.useState({
    title: "",
    description: "",
    time: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (remindersList.length === 0) {
      setRemindersList(route.params.data);
    }
  }, []);

  const handleSubmit = () => {
    if (!reminders.title) {
      Alert.alert("Please add a title");
      return; // Stop execution if any key is empty
    }
    // Create a new object with an 'id' property
    const newReminder = {
      id: remindersList.length + 1, // Generate a unique ID (e.g., incrementing index)
      ...reminders, // Spread the existing 'reminders' object
    };

    setRemindersList([...remindersList, newReminder]);

    navigation.pop();
  };

  const currentDateData = getCurrentDate();

  const handleChange = (type, value) => {
    setReminders({
      ...reminders,
      [type]: value,
    });
  };

  const [date, setDate] = useState(new Date(currentDateData.tomorrowTimestamp));

  const onChange = (event, selectedDate) => {
    const newDate = selectedDate;
    setDate(newDate);
    handleChange("time", newDate);
    // console.log(newDate);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Title"
          value={reminders.title}
          underlineColor="white"
          style={styles.input}
          textColor="white"
          activeUnderlineColor={Colors.pastalGreen}
          mode="flat"
          autoCapitalize="sentences"
          textContentType="password"
          onChangeText={(val) => handleChange("title", val)}
        />
        <TextInput
          label="Description"
          value={reminders.description}
          underlineColor="white"
          style={styles.input}
          textColor="white"
          activeUnderlineColor={Colors.pastalGreen}
          mode="flat"
          autoCapitalize="sentences"
          textContentType="password"
          onChangeText={(val) => handleChange("description", val)}
        />
      </View>
      <View style={styles.dateTimeSelectorContainer}>
        <DateTimePicker
          testID="TimePicker"
          value={date}
          mode="datetime"
          themeVariant="dark"
          accentColor={Colors.pastalGreen}
          is24Hour={true}
          onChange={onChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonTouchable} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkPrim,
  },
  inputContainer: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    maxWidth: 380,
    width: "100%",
    backgroundColor: Colors.darkSec,
    marginBottom: 18,
  },
  dateTimeSelectorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 18,
    paddingHorizontal: 24,
    alignContent: "flex-end",
    flexDirection: "row",
  },
  buttonTouchable: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.pastalGreen,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default AddReminderScreen;
