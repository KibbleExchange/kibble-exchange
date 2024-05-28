import {
  ActionConnect,
  ActionSocial,
  ActionTheme,
  HDLogo,
  HeaderAction,
  HeaderDashboardContainer,
  HeaderDashboardWrapper,
  HeaderNavigation,
  NavigationHamburger,
  NavigationMobile,
  NavigationMobileItem,
  NavigationMobileMain,
} from "./styled";
import header_logo from "../../../assets/Header/logo.svg";
import header_logo_light from "../../../assets/Header/logo_light.svg";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useContext, useEffect, useRef, useState } from "react";
import iconSwap from "../../../assets/Dashboard/Header/icon-swap.svg";
import iconLauch from "../../../assets/Dashboard/Header/icon-lauch.svg";
import iconLiquidity from "../../../assets/Dashboard/Header/icon-liquidity.svg";
import iconStaking from "../../../assets/Dashboard/Header/icon-staking.svg";
import iconKibble from "../../../assets/Dashboard/Header/icon-kibble.svg";
import iconKibble_light from "../../../assets/Dashboard/Header/icon-kibble_02.svg";
import iconSwap_light from "../../../assets/Dashboard/Header/iconSwap_light.svg";
import iconLauch_light from "../../../assets/Dashboard/Header/iconLauch_light.svg";
import iconLiquidity_light from "../../../assets/Dashboard/Header/iconLiquidity_light.svg";
import iconStaking_light from "../../../assets/Dashboard/Header/iconStaking_light.svg";
import balance from "../../../assets/Dashboard/Common/balance_icon.svg";
import balance_light from "../../../assets/Dashboard/Common/balance_icon_light.svg";
import { Link } from "react-router-dom";
import WalletInfo from "../Wallet";
import { useGetBalancesQuery } from "../../../store/api/dexApiSlice";
import toast from "react-hot-toast";
import { ContextProviderWrapper, ModalOverlay } from "@kibble-exchange/uikit";
import close from "../../../assets/Dashboard/Common/close.svg";

const HeaderDashboard = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const [openHamburger, setOpenHamburger] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [titlePage, setTitlePage] = useState("");
  const [textActive, setTextActive] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const wallet = useTonWallet();
  const { toggleTheme, theme, isMobile } = useContext(ContextProviderWrapper)!;

  const { pathname } = useLocation();
  const { id } = useParams();

  const { data: balances }: any = useGetBalancesQuery(address, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });

  useEffect(() => {
    if (openHamburger) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  }, [openHamburger]);

  const onpenWalletInfo = async () => {
    setOpenConfirmModal(true);
  };

  const handleSetRouteName = () => {
    const textInRoute = pathname
      .replaceAll("/", " ")
      .split(" ")
      .filter((item: any) => item !== id && item);

    const title = `${textInRoute[0] ? textInRoute[0] : ""} ${
      textInRoute[1] ? `/ ${textInRoute[1]}` : ""
    }`;

    setTextActive(textInRoute[0]);

    setTitlePage(title);
  };

  useEffect(() => {
    handleSetRouteName();
  }, [pathname]);

  // handle click outside hamburger
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setCollapse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburgerRef]);

  return (
    <HeaderDashboardContainer
      style={{
        backgroundColor:
          pathname === "/kibble" && theme === "dark"
            ? "#000"
            : pathname === "/kibble" && theme === "light"
            ? "#0375E9"
            : "",
      }}
    >
      <ModalOverlay
        component={
          <WalletInfo
            address={address}
            balance={balances}
            onCloseModal={() => {
              setOpenConfirmModal(false);
            }}
          />
        }
        onClickParent={() => {
          setOpenConfirmModal(false);
        }}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title={"Your wallet"}
        width="500px"
        closeIcon={close}
      />
      <HeaderDashboardWrapper>
        <HDLogo to="https://kibble.exchange/">
          <img
            src={theme === "light" ? header_logo_light : header_logo}
            alt="logo"
          />
        </HDLogo>
        <HeaderAction>
          <ActionTheme
            className={theme}
            onClick={() => {
              pathname !== "/kibble"
                ? toggleTheme()
                : toast.error("This page doesn't support light mode");
            }}
          />
          <ActionSocial className={theme}>
            {socialAction.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.href} target="_blank">
                    <img src={item.icon} alt="icon" />
                  </Link>
                </li>
              );
            })}
          </ActionSocial>
          <ActionConnect
            className={theme}
            onClick={() => {
              !address ? tonConnectUI.openModal() : onpenWalletInfo();
            }}
          >
            {address ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <figure>
                  <img
                    src={theme === "light" ? balance_light : balance}
                    alt="icon"
                  />
                </figure>
                <p>
                  {address.slice(0, 4)}...{address.slice(-4)}
                </p>
              </div>
            ) : (
              <>
                <figure>
                  <img
                    src={theme === "light" ? balance_light : balance}
                    alt="icon"
                  />
                </figure>
                <p>Connect Wallet</p>
              </>
            )}
          </ActionConnect>
        </HeaderAction>
        <HeaderNavigation className={theme}>
          <p className="title-page">{titlePage}</p>
          <NavigationHamburger
            ref={hamburgerRef}
            onClick={() => {
              setCollapse(!collapse);
            }}
            className={
              collapse && theme === "dark"
                ? "open"
                : collapse && theme === "light"
                ? `open ${theme}`
                : theme
            }
          >
            <div>
              <span></span>
              <span></span>
            </div>
            <ul>
              {navData.map((item: any, index: number) => {
                return (
                  <li
                    style={{
                      transform: collapse ? "translate(0)" : "translate(-30px)",
                      opacity: collapse ? "1" : "0",
                      transition: collapse ? "all .15s linear" : "none",
                      transitionDelay: collapse ? item.delay : "unset",
                      display: item.id === 5 && !isMobile ? "none" : "block",
                    }}
                    onClick={() => {
                      setOpenHamburger(false);
                    }}
                    key={index}
                  >
                    <NavLink to={item.href}>
                      <p>{item.title}</p>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </NavigationHamburger>
        </HeaderNavigation>
        <NavigationMobileMain>
          <NavigationMobile className={theme}>
            {navData.map((item: any, index: number) => {
              return (
                <Link to={item.href} key={index}>
                  <NavigationMobileItem className={theme}>
                    <div className="img-icon">
                      <figure>
                        <img
                          style={{
                            filter:
                              `/${textActive}` === item.href
                                ? "unset"
                                : " contrast(0.1)",
                          }}
                          src={
                            `/${textActive}` === item.href && theme === "light"
                              ? item.light
                              : theme === "light" ? item.light : item.icon
                          }
                          alt={item.title}
                        />
                      </figure>
                    </div>
                    <p
                      style={{
                        color:
                          `/${textActive}` === item.href && theme === "dark"
                            ? "#b5ebff"
                            : `/${textActive}` !== item.href &&
                              theme === "light"
                            ? "#B8B8C1"
                            : `/${textActive}` === item.href &&
                              theme === "light"
                            ? "#0693FF"
                            : "#92929e",
                      }}
                    >
                      {item.title}
                    </p>
                  </NavigationMobileItem>
                </Link>
              );
            })}
          </NavigationMobile>
        </NavigationMobileMain>
      </HeaderDashboardWrapper>
    </HeaderDashboardContainer>
  );
};

const navData: any = [
  {
    id: 1,
    title: "Swap",
    href: "/swap",
    delay: "0.1s",
    icon: iconSwap,
    light: iconSwap_light,
  },
  {
    id: 4,
    title: "Liquidity",
    href: "/liquidity",
    delay: "0.2s",
    icon: iconLiquidity,
    light: iconLiquidity_light,
  },
  {
    id: 5,
    title: "Kibble",
    href: "/kibble",
    delay: "0.2s",
    icon: iconKibble,
    light: iconKibble_light,
  },
  {
    id: 2,
    title: "Launchpad",
    href: "/launchpad",
    delay: "0.3s",
    icon: iconLauch,
    light: iconLauch_light,
  },
  {
    id: 3,
    title: "Staking",
    href: "/staking",
    delay: "0.4s",
    icon: iconStaking,
    light: iconStaking_light,
  },
];

const socialAction = [
  {
    icon: "/static/icon-tele.png",
    href: "https://t.me/KibbleOfficial",
  },
  {
    icon: "/static/icon-x.png",
    href: "https://twitter.com/KibbleExchange",
  },
  {
    icon: "/static/icon-dis.png",
    href: "https://discord.gg/GGgE67XcbJ",
  },
];

export default HeaderDashboard;
