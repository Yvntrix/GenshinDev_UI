import { Avatar, Container, Group, Paper, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.05,
                delay: id * 0.05,
                type: "tween",
              }}
            >
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
                    backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(127,66,183,.3))`,
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
                    <Text weight={700} transform="capitalize" align="center">
                      {src.name}
                    </Text>
                  </Stack>
                </Paper>
              </Link>
            </motion.div>
          </div>
        );
      })}
    </Group>
  );
}
