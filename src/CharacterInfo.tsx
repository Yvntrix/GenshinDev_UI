import {
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DarkModeButton } from "./components/DarkModeButton";

export default function CharacterInfo() {
  let { character } = useParams();
  useEffect(() => {
    getCharData();
  }, []);
  const [details, setDetails] = useState<any[]>([]);
  let datas: any[] = [];
  const getCharData = () => {
    axios
      .get("https://api.genshin.dev/characters/" + character)
      .then(async (result) => {
        const data = await result.data;
        datas.push(data);
        setDetails(datas);
      });
  };

  return (
    <Stack
      p="md"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141517",
        backgroundImage: `linear-gradient(rgba(0,0,0,.97), rgba(0,0,0,.4)),
        url(https://api.genshin.dev/characters/${character}/gacha-splash)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Group position="right">
        <DarkModeButton />
      </Group>
      <Container>
        {details.map((info, id) => {
          return (
            <div key={id}>
              <Text
                component="span"
                align="center"
                color={
                  info.vision == "Cryo"
                    ? "#A5D8FF"
                    : info.vision == "Pyro"
                    ? "#f03e3e"
                    : info.vision == "Anemo"
                    ? "#63e6be"
                    : info.vision == "Electro"
                    ? "#be4bdb"
                    : info.vision == "Geo"
                    ? "#fcc419"
                    : info.vision == "Hydro"
                    ? "#1c7ed6"
                    : "dimmed"
                }
                style={{ fontFamily: "Greycliff CF, sans-serif" }}
              >
                <Title align="center"> {info.name}</Title>
              </Text>
              <Group p="sm">
                <Image
                  radius="md"
                  height={480}
                  src={`https://api.genshin.dev/characters/${character}/portrait`}
                  alt={info.name}
                />
              </Group>
            </div>
          );
        })}
      </Container>
    </Stack>
  );
}
