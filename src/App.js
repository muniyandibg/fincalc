import Select from "react-dropdown-select";
import "./App.css";
import { useState } from "react";
import Calculator from "./Components/Calculator";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const options = [
  {
    value: 1,
    label: "Leanne Graham",
  },
  {
    value: 2,
    label: "Ervin Howell",
  },
];

function App() {
  const [items, setItems] = useState([]);
  const handleChange = (values) => {
    setItems(values);
    console.log(values);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Calculator />
      </div>
    </QueryClientProvider>
  );
}

export default App;
