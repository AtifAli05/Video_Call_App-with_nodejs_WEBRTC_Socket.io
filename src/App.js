import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Components/Home";
import { SocketProvider } from "./Providers/Socket";
import Room from "./Pages/Components/Room";
import { PeerProvider } from "./Providers/Peer";
function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>{" "}
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
