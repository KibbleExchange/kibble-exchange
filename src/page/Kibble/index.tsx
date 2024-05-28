import React, { useContext, useEffect } from "react";
import {
  FooterLogo,
  KibbleContainer,
  KibbleContentBottom,
  KibbleContentTop,
  KibbleContentVideo,
  KibbleText,
  KibbleTitle,
  KibbleWrapper,
} from "./styled";
import email from "../../assets/Footer/email.svg";
import footerLogo from "../../assets/Kibble/footer_kibble_logo.png";
import {
  FooterSocial,
  FormInput,
  LabelForm,
  SubscribeForm,
} from "../../components/Footer/styled";
import { ButtonReset } from "../Swap/styled";
import { Link } from "react-router-dom";
import { useTonAddress } from "@tonconnect/ui-react";
import { ContextProviderWrapper, InputCommon } from "@kibble-exchange/uikit";

const Kibble = () => {
  const address = useTonAddress();
  const { isDesktop, setTheme } = useContext(ContextProviderWrapper)!;

  useEffect(() => {
    setTheme("dark")
  },[])

  return (
    <>
      {!isDesktop ? (
        <KibbleContainer>
          <KibbleContentVideo>
            <video autoPlay muted loop playsInline>
              <source
                src={
                    "./video/video.mp4"
                }
                type="video/mp4"
              />
            </video>
          </KibbleContentVideo>
          <KibbleWrapper>
            <KibbleContentTop>
              <KibbleTitle>
                <span className="text-left">Hello </span>
                {address ? (
                  <span className="text-right">
                    <span className="text-small">**</span>
                    {address.slice(-4)},
                  </span>
                ) : (
                  <span>***</span>
                )}
              </KibbleTitle>
              <KibbleText>
                We are here to provide all you need for{" "}
                <span className="is-yellow">the best</span> trading experience
                and optimal advances on{" "}
                <span className="is-blue">TON blockchain.</span>
              </KibbleText>
            </KibbleContentTop>
          </KibbleWrapper>
          <KibbleContentBottom>
            <SubscribeForm>
              <FormInput>
                <LabelForm>
                  <span>Your email</span>
                </LabelForm>
                <InputCommon
                  prefix={<img src={email} alt="icon" />}
                  placeHolder="Please input your email"
                />
              </FormInput>
              <ButtonReset>
                <p>Subscribe</p>
              </ButtonReset>
            </SubscribeForm>
            <FooterSocial>
              {socialData.map((item, index) => {
                return (
                  <li>
                    <Link
                      to={item.href}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p>{item.text}</p>
                    </Link>
                  </li>
                );
              })}
            </FooterSocial>
            <FooterLogo>
              <Link to={"/"}>
                <img src={footerLogo} alt="" />
              </Link>
            </FooterLogo>
          </KibbleContentBottom>
        </KibbleContainer>
      ) : (
        window.location.replace("/swap")
      )}
    </>
  );
};

const socialData = [
  {
    text: "TELEGRAM",
    href: "https://t.me/KibbleOfficial",
  },
  {
    text: "TWITTER",
    href: "https://twitter.com/KibbleExchange",
  },
  {
    text: "MEDIUM",
    href: "https://medium.com/@kibble.exchange",
  },
  {
    text: "DISCORD",
    href: "https://discord.gg/GGgE67XcbJ",
  },
  {
    text: "YOUTUBE",
    href: "https://www.youtube.com/@KibbleExchange",
  },
];

export default Kibble;
