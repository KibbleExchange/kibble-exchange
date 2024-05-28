import Footer from "./components/Footer";
import { AppContainer } from "./styled";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import LayoutDashboard from "./Layout/Dashboard";
import Swap from "./page/Swap";
import Farm from "./page/Farm";
import Launchpad from "./page/Launchpad";
import Liquidity from "./page/Liquidity";
import Community from "./page/Community";
import { store } from "./store/store";
import { Provider } from "react-redux";
import WebApp from "@twa-dev/sdk";
import IDODetail from "./page/Launchpad/Detail";
import AddLiquidity from "./page/Liquidity/Add";
import CreatePoolLiquidity from "./page/Liquidity/CreatePool";
import LiquidityDetails from "./page/Liquidity/Details";
import LayoutLiquidity from "./Layout/Liquidity";
import Kibble from "./page/Kibble";
import { ContextProviderWrapper, GlobalStyle } from "@kibble-exchange/uikit";

const App = () => {
  const { pathname } = useLocation();
  const { theme, isMobile } = useContext(ContextProviderWrapper)!;

  useEffect(() => {
    if (pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl={process.env.REACT_APP_CONNECT_UI_PROVIDER}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: "Syne",
            },
          }}
        />
        <GlobalStyle theme={theme} />
        <AppContainer className={`${theme} ${pathname === '/kibble' && theme === "dark" ? 'is-kibble' : pathname === '/kibble' && theme === "light" ? `is-kibble ${theme}`  : ''}`} pathname={pathname === "/"}>
          <Routes>
            <Route element={<LayoutDashboard />}>
              <Route index path="swap" element={<Swap />} />
              <Route path="staking" element={<Farm />} />
              <Route path="launchpad" element={<Launchpad />} />
              <Route path="kibble" element={<Kibble />} />
              <Route path="launchpad/:id" element={<IDODetail />} />
              <Route path="liquidity" element={<LayoutLiquidity />}>
                <Route index element={<Liquidity />} />
                <Route path="provide" element={<AddLiquidity />} />
                <Route path="details/:id" element={<LiquidityDetails />} />
                <Route path="init" element={<CreatePoolLiquidity />} />
              </Route>
              <Route path="community-tool" element={<Community />} />
            </Route>
            <Route path="*" element={<Navigate to="/swap" />} />
          </Routes>
          {!isMobile && <Footer />}
        </AppContainer>
      </TonConnectUIProvider>
    </Provider>
  );
};

export default App;
