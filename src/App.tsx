import { BrowserRouter } from "react-router-dom";
import RenderRoutes from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Provider store={store}>
        <RenderRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
