import { Section, Container, Flex } from "@radix-ui/themes";
import React from "react";
import Logo from "./Logo";

function Navbar() {
  return (
    <Section size="1" className="w-full border-b">
      <Container size="4">
        <Flex gap="6" align={"center"}>
          <div>
            <Logo />
          </div>
          <Flex gap="4" align={"center"}>
            <a href="/" className="font-semibold">
              Dashboard
            </a>
            <a href="/ip-settings" className="font-semibold ">
              IP Settings
            </a>
            <a href="/api-keys" className="font-semibold">
              API Keys
            </a>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}

export default Navbar;
