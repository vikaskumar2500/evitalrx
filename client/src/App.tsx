import Header from "./components/header";
import { RouteHanler } from "./routes";


function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header/>
      <RouteHanler />
    </main>
  );
}

export default App;
