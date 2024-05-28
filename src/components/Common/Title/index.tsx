import { useScramble } from "use-scramble";
import { TitleContainer, TitleInner } from "./styled";
import { useContext } from "react";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const TitleCommon = ({ text }: any) => {
  const {isDesktop, theme} = useContext(ContextProviderWrapper)!
  const { ref } = useScramble({
    text,
    playOnMount: isDesktop ? true : false,
    speed: .65
  });
  return (
    <TitleContainer className={theme}>
      <TitleInner ref={ref}/>
    </TitleContainer>
  );
};

export default TitleCommon;
