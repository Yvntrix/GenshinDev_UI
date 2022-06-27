import {
  Avatar,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "tabler-icons-react";
import { DarkModeButton } from "./components/DarkModeButton";

export default function CharacterInfo() {
  let { character } = useParams();
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState("");
  const [rgb, setRgb] = useState(`0,0,0,`);
  const [element, setElement] = useState("");
  let datas: any[] = [];
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
          setTimeout(() => {
            setLoading(false);
          }, 700);
        } else {
          setImg(
            "https://drive.google.com/uc?export=view&id=1yfF_o3ZXrE-AUVofm5kVk-SddtBp6HmM"
          );
          setTimeout(() => {
            setLoading(false);
          }, 700);
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
        setElement(data.vision.toLowerCase());

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
    <>
      {loading ? (
        <Center sx={{ minHeight: "100vh" }}>
          <Loader color="violet" />
        </Center>
      ) : (
        <Stack
          p="md"
          sx={{
            backgroundColor: `rgba(${rgb}.3)`,
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,.97), rgba(${rgb}.3)) , url(${img})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
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
                  >
                    <Title align="center"> {info.name}</Title>
                  </Text>
                  <Group p="sm">
                    <Paper
                      radius="lg"
                      p="xs"
                      sx={{
                        background: "rgba(0, 0, 0, 0.4)",
                        minHeight: 480,
                        minWidth: 270,
                        backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(${rgb}.3))`,
                      }}
                    >
                      <Group position="apart">
                        <Group align="center" spacing="xs" position="center">
                          <Text align="center" color="#ffe066" weight={700}>
                            {info.rarity}
                          </Text>
                          <Star color="#ffe066" size={24} />
                        </Group>

                        <Avatar
                          sx={{
                            transition: " transform .3s",
                            "&:hover": {
                              transform: " scale(2)",
                            },
                          }}
                          size={26}
                          radius="xl"
                          src={`https://api.genshin.dev/elements/${info.vision.toLowerCase()}/icon`}
                        />
                      </Group>
                      <Image
                        radius="md"
                        fit="contain"
                        height={480}
                        width={270}
                        sx={{
                          transition: " transform .3s",
                          "&:hover": {
                            transform: " scale(1.4)",
                          },
                        }}
                        src={
                          info.name == "Yae Miko"
                            ? `https://api.genshin.dev/characters/${character}/gacha-splash`
                            : `https://api.genshin.dev/characters/${character}/portrait`
                        }
                        withPlaceholder
                      />
                    </Paper>
                  </Group>
                </div>
              );
            })}
          </Container>
        </Stack>
      )}
    </>
  );
}
