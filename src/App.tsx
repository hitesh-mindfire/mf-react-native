import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  console.log("app component rendered");
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
