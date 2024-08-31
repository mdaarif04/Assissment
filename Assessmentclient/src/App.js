import { BrowserRouter, Route, Routes } from "react-router-dom";
import create_assessment from "./create_assessment";
import Dashboard from "./Dashboard";
import QuestionBankComponent from "./QuestionBankComponent";
import QuestionCreationComponent from "./QuestionCreationComponent";
import QuestionBank from "./Questions/integration";
import QuestionList from "./Questions/QuestionCreationsnew";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Dashboard /> */}
        <main className="wrap_page">
          <Routes>
            <Route exact path="/" Component={Dashboard} />
            <Route
              exact
              path="/create_assessment"
              Component={create_assessment}
            />
            <Route
              exact
              path="/questionscreation"
              Component={QuestionCreationComponent}
            />
            <Route exact path="/questions" Component={QuestionBankComponent} />
            <Route exact path="/integration" Component={QuestionBank} />
            <Route exact path="/creation" Component={QuestionList} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
