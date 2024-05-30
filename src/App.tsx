import { Route, Routes } from "react-router-dom";
import PageCharactersList from "./PageCharactersList";
import PageCover from "./PageCover";
import PageCharacterDetail from "./PageCharacterDetail";
import { LocationContextProvider } from "./context/LocationContext";
import PageLocation from "./PageLocation";
import PageLocationList from "./PageLocationList";

function App() {
    return (
        <LocationContextProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PageCover />} />
                    <Route path="/list-characters" element={<PageCharactersList />} />
                    <Route path="/character-detail/:id" element={<PageCharacterDetail />} />
                    <Route path="/list-locations" element={<PageLocationList />} />
                    <Route path="/character-by-location/:locationId" element={<PageLocation />} />
                </Routes>
            </div>
        </LocationContextProvider>
    );
}

export default App;
