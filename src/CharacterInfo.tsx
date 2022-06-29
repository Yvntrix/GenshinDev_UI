import {
  ActionIcon,
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Affiliate,
  ChevronLeft,
  Gift,
  Id,
  Map,
  NorthStar,
  Star,
  Sword,
} from "tabler-icons-react";

export default function CharacterInfo() {
  let { character } = useParams();
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState("");
  const [rgb, setRgb] = useState(`0,0,0,`);
  const [color, setColor] = useState(`dimmed`);
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

        if (data.vision == "Pyro") {
          setRgb(`240,62,62,`);
          setColor(`#f03e3e`);
        }
        if (data.vision == "Geo") {
          setRgb(`252,196,25,`);
          setColor(`#fcc419`);
        }
        if (data.vision == "Cryo") {
          setRgb(`165,216,255,`);
          setColor(`#A5D8FF`);
        }
        if (data.vision == "Hydro") {
          setRgb(`28,126,214,`);
          setColor(`#1c7ed6`);
        }
        if (data.vision == "Electro") {
          setRgb(`190,75,219,`);
          setColor(`#be4bdb`);
        }
        if (data.vision == "Anemo") {
          setRgb(`99,230,190,`);
          setColor(`#63e6be`);
        }

        setDetails(datas);
      });
  };

  return (
    <>
      {loading ? (
        <Center sx={{ minHeight: "100vh" }}>
          <Loader color={color} />
        </Center>
      ) : (
        <Stack
          p="md"
          sx={{
            backgroundColor: `rgba(${rgb}.3)`,
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,.98), rgba(${rgb}.3)) , url(${img})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        >
          <Group position="left">
            <ActionIcon<"a"> variant="outline" component="a" href="/">
              <ChevronLeft size={16} />
            </ActionIcon>
          </Group>
          <Container size="xl">
            {details.map((info, id) => {
              return (
                <div key={id}>
                  <Text component="span" align="center" color={color}>
                    <Title align="center"> {info.name}</Title>
                  </Text>
                  <Group p="sm" position="center">
                    <Paper
                      radius="lg"
                      p="xs"
                      sx={{
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(5px)",
                        minHeight: 480,
                        minWidth: 270,
                        backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(${rgb}.3))`,
                      }}
                    >
                      <Group position="apart" p="xs">
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
                      />
                    </Paper>
                    <Paper
                      radius="lg"
                      p="xs"
                      sx={{
                        background: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(5px)",
                        backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(${rgb}.3))`,
                      }}
                    >
                      <Stack
                        align="flex-start"
                        justify="flex-start"
                        spacing="xs"
                        sx={{ minHeight: 480, maxWidth: 270, minWidth: 270 }}
                      >
                        <Group align="center" spacing="xs">
                          <Id color={color} />
                          <Text color={color} weight={550}>
                            Description
                          </Text>
                        </Group>

                        <Text>{info.description}</Text>
                        <Group align="center" spacing="xs">
                          <Affiliate color={color} />
                          <Text color={color} weight={550}>
                            Affiliation
                          </Text>
                        </Group>
                        <Text>{info.affiliation}</Text>
                        <Group align="center" spacing="xs">
                          <Map color={color} />
                          <Text color={color} weight={550}>
                            Nation
                          </Text>
                        </Group>
                        <Text>{info.nation}</Text>
                        <Group align="center" spacing="xs">
                          <Sword color={color} />
                          <Text color={color} weight={550}>
                            Weapon
                          </Text>
                        </Group>
                        <Text>{info.weapon}</Text>
                        <Group align="center" spacing="xs">
                          <NorthStar color={color} />
                          <Text color={color} weight={550}>
                            Constellation
                          </Text>
                        </Group>
                        <Text>{info.constellation}</Text>
                        <Group align="center" spacing="xs">
                          <Gift color={color} />
                          <Text color={color} weight={550}>
                            Birthday
                          </Text>
                        </Group>
                        <Text>{dayjs(info.birthday).format("MMMM DD")}</Text>
                      </Stack>
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
