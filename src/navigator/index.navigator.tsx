import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../routes/home";

import { Colors } from "../constants/constants";
import AddReminderScreen from "../routes/addReminder";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          // headerBackTitle: null,
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Home"
            options={() => ({
              title: "Reminders",
              headerStyle: {
                backgroundColor: Colors.darkSec,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 400,
              },
            })}
            component={HomePage}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="AddReminderScreen"
            component={AddReminderScreen}
            options={() => ({
              title: "Add reminders",
              headerStyle: {
                backgroundColor: Colors.darkSec,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 400,
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
