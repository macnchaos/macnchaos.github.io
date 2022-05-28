import DesktopApp from "./desktop/DesktopApp";
import MobileApp from "./mobile/MobileApp";
import { useMediaQuery } from 'react-responsive'


function App() {

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });
  return (
    <div>
      {isDesktop?<DesktopApp/>:<MobileApp/>}
    </div>
  );
}

export default App;
