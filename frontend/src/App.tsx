import Layout from "./layouts/Layout";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <p>Home Page</p>
                        </Layout>
                    }
                ></Route>
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <p>Search Page</p>
                        </Layout>
                    }
                ></Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        </Router>
    );
};

export default App;
