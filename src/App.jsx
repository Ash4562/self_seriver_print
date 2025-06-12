import React from "react";
import AppRoutes from "./public/routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
};

export default App;
