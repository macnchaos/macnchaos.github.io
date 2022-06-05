import DesktopApp from "./desktop/DesktopApp";
import MobileApp from "./mobile/MobileApp";
import { useMediaQuery } from 'react-responsive'


function App() {

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 850px)",
  });
  return (
    <div>
      {<MobileApp/>}
    </div>
    // <div>
    //   {isDesktop?<DesktopApp/>:<MobileApp/>}
    // </div>
  );
}

export default App;
