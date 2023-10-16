import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import 'react-app-polyfill/stable'
import 'core-js'
import './scss/style.scss'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
// import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AuthProvider } from "./auth-context/auth.context";
import { ProtectedRoute } from "./layouts/protected.route.js";
import { Provider } from "react-redux";
import  {store} from './services/store'

let user = localStorage.getItem("user");
user = JSON.parse(user);
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <AuthProvider userData={user}>
    <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <ProtectedRoute path={`/admin`} component={AdminLayout} />
          {/* <ProtectedRoute path={`/rtl`} component={RTLLayout} /> */}
          <Redirect from='/' to='/admin/dashboards' />
        </Switch>
      </HashRouter>
      </Provider>
    </React.StrictMode>
    </AuthProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
