import "./App.scss";
import { FormWithValidation } from "./components";

const validationRules = {
    name: /^[a-zA-Z\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{10,}$/,
    acceptRules: /^true$/,
};

function App() {
    return (
        <div className="app">
            <FormWithValidation validationRules={validationRules} />
        </div>
    );
}

export default App;
