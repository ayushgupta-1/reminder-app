import "react-native-gesture-handler";
import React from "react";
import StackNavigator from "./src/navigator/index.navigator";
import { AppContextProvider } from "./src/contexts/app.context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </AppContextProvider>
  );
}
