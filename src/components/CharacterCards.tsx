import { Avatar, Container, Group, Paper, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CharacterCards() {
  const [detail, setDetail] = useState<any[]>([]);
  let details: any[] = [];
  useEffect(() => {
    getCharData();
  }, []);

  const getCharData = () => {
    axios.get("https://api.genshin.dev/characters/").then(async (result) => {
      const characters = await result.data;
      for (let i in characters) {
        if (characters[i] == "yae-miko") {
          details.push({
            name: characters[i],
            imgsrc: `https://api.genshin.dev/characters/${characters[i]}/icon-big`,
          });
        } else {
          details.push({
            name: characters[i],
            imgsrc: `https://api.genshin.dev/characters/${characters[i]}/icon`,
          });
        }
      }
      setDetail(details);
    });
  };
  return (
    <Group position="center">
      {detail.map((src, id) => {
        return (
          <div key={id}>
            <Link
              to={`characters/${src.name}`}
              style={{ textDecoration: "none" }}
            >
              <Paper
                withBorder
                radius="md"
                p="xs"
                shadow="sm"
                sx={{
                  minWidth: 144,
                  transition: " transform .2s",
                  "&:hover": {
                    transform: " scale(1.05)",
                  },
                }}
              >
                <Stack align="center">
                  <Avatar
                    radius="xl"
                    size="xl"
                    alt={src.name}
                    src={src.imgsrc}
                  />
                  <Text transform="capitalize" align="center">
                    {src.name}
                  </Text>
                </Stack>
              </Paper>
            </Link>
          </div>
        );
      })}
    </Group>
  );
}
