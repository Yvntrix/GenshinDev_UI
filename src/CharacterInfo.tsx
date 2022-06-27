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
  const [details, setDetails] = useState<any[]>([]);
  let datas: any[] = [];
  const [img, setImg] = useState(
    "https://drive.google.com/uc?export=view&id=1yfF_o3ZXrE-AUVofm5kVk-SddtBp6HmM"
  );
  const [rgb, setRgb] = useState(`0,0,0,`);
  useEffect(() => {
    getCharData();
    CheckImage(`https://api.genshin.dev/characters/${character}/gacha-splash`);
  }, []);

  function CheckImage(path: string) {
    fetch(path, {
      method: "HEAD",
    })
      .then((res) => {
        if (res.ok) {
          setImg(
            `https://api.genshin.dev/characters/${character}/gacha-splash`
          );
        } else {
          setImg(
            "https://drive.google.com/uc?export=view&id=1yfF_o3ZXrE-AUVofm5kVk-SddtBp6HmM"
          );
        }
      })
      .catch((err) => console.log("Error:", err));
  }
  const getCharData = () => {
    axios
      .get("https://api.genshin.dev/characters/" + character)
      .then(async (result) => {
        const data = await result.data;
        datas.push(data);

        if (data.vision == "Pyro") {
          setRgb(`240,62,62,`);
        }
        if (data.vision == "Geo") {
          setRgb(`252,196,25,`);
        }
        if (data.vision == "Cryo") {
          setRgb(`165,216,255,`);
        }
        if (data.vision == "Hydro") {
          setRgb(`28,126,214,`);
        }
        if (data.vision == "Electro") {
          setRgb(`190,75,219,`);
        }
        if (data.vision == "Anemo") {
          setRgb(`99,230,190,`);
        }

        setDetails(datas);
      });
  };

  return (
    <Stack
      p="md"
      sx={{
        backgroundColor: `rgba(${rgb}.3)`,
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.97), rgba(${rgb}.4)),
        url(${img})`,
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
