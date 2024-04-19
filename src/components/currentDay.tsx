import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment-timezone";

import { Colors } from "../constants/constants";
import { getCurrentDate } from "../utils/dateTime";

const CurrentDay = () => {
  const currentDateData = getCurrentDate();

  const currentDate = currentDateData.date;
  const currentMonth = currentDateData.month;
  const currentMonthName = currentDateData.monthName;
  const currentYear = currentDateData.year;
  const currentDayName = currentDateData.dayName;

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textDate}>{currentDate}</Text>
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text style={styles.textMonthYear}>
            {currentMonthName}, {currentYear}
          </Text>
          <Text style={styles.textMonthYear}>{currentDayName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "black",
    gap: 8,
  },
  textDate: {
    fontSize: 52,
    fontWeight: "700",
    color: Colors.pastalGreen,
  },
  textMonthYear: {
    fontSize: 18,
    color: Colors.pastalGreen,
  },
  titleStyle: {
    color: "white",
  },
});

export default CurrentDay;
