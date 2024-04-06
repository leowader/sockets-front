import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes/Router";
import Loading from "./components/shared/Loading";

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading/>}>
          <AppRouter />
        </Suspense>
      </Router>
    </>
  );
}

export default App;
