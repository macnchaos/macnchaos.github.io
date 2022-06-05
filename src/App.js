import DesktopApp from "./desktop/DesktopApp";
import MobileApp from "./mobile/MobileApp";
import { useMediaQuery } from 'react-responsive'
import "./App.css";

function App() {

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 850px)",
  });
  return (
    <div className="desktop-parent">
      {isDesktop?<DesktopApp/>:<MobileApp/>}
    </div>
  );
}

export default App;
