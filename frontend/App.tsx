import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/store/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./src/store/modules";
import LoadingContainer from "./src/components/Pages/loadingContainer";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmTsmSlAe3KkdJ8A4X8yS3EgOIpd7Z9HQ",
  authDomain: "ssoak-12410.firebaseapp.com",
  databaseURL: "https://ssoak-12410-default-rtdb.firebaseio.com",
  projectId: "ssoak-12410",
  storageBucket: "ssoak-12410.appspot.com",
  messagingSenderId: "26426975279",
  appId: "1:26426975279:web:c0135154c546223a3c52da",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default function App() {
  useEffect(() => {
    if (typeof TextEncoder !== "function") {
      const TextEncodingPolyfill = require("text-encoding");
      TextEncoder = TextEncodingPolyfill.TextEncoder;
      TextDecoder = TextEncodingPolyfill.TextDecoder;
    }
  }, []);
  return (
    <Provider store={store}>
      <LoadingContainer />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
