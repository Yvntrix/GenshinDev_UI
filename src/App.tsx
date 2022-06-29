import {
  MantineProvider
} from "@mantine/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CharacterInfo from "./CharacterInfo";
import { Home } from "./Home";
function App() {
  return (

      <MantineProvider
        theme={{ colorScheme:"dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <Routes>
            <Route
              path={`/characters/:character`}
              element={<CharacterInfo />}
            />
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
  );
}

export default App;
