import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import beamsterwight from "../../../assets/img/auth/BeamsterLogin.png"
import beamster from "../../../assets/img/auth/Beamster-White.png"
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

let mode = localStorage.getItem('chakra-ui-color-mode')

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <img src={mode=="dark"?beamster:beamsterwight} width={400} height={400} />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
