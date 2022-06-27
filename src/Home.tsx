import { Container, Group, Stack, Text, Title } from "@mantine/core";
import CharacterCards from "./components/CharacterCards";
import { DarkModeButton } from "./components/DarkModeButton";

export const Home = () => {
  return (
    <Stack p="md">
      <Group position="right">
        <DarkModeButton />
      </Group>
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: "blue", to: "grape", deg: 180 }}
        style={{ fontFamily: "Greycliff CF, sans-serif" }}
      >
        <Title align="center">Genshin.Dev UI</Title>
      </Text>

      <Container>
        <Text align="center">
          <Text
            variant="link"
            component="a"
            href="https://genshin.dev/"
            target="_blank"
          >
            Genshin.Dev
          </Text>{" "}
          is a fan-made API for easy access to game data. This site utilize the
          API to display data in this website.
        </Text>
      </Container>
      <Container size="xl">
        <CharacterCards />
      </Container>
    </Stack>
  );
};
