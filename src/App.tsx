import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { PersistGate } from "redux-persist/integration/react";
import Router from "./route/index";
import { store, persistor } from "./redux/index";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("en");

interface IProps {}
const App: React.FC<IProps> = () => {
  console.info(
    "%c%s",
    "color: rgb(120, 187, 120); font-size: 24px;",
    "Project is running!"
  );
  console.log(
    `%c react-devtools %c Detected React v${React.version} %c`,
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <Router />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
