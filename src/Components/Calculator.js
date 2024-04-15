import Select from "react-dropdown-select";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAppData from "../Store/appStore";

function Calculator() {
  const calcResult = useAppData((state) => state.calcResult);
  const setCalcResult = useAppData((state) => state.setCalcResult);

  const [result, setResult] = useState("");
  const [final, setFinal] = useState("");
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);
  const handleChange = (values) => {
    setItems(values);
    console.log(values);
  };

  useEffect(() => {
    let exp = "";
    if (items.length) {
      items.map((item) => (exp = exp.concat(item.value)));
      setResult(exp);
      console.log(items);
    }
  }, [items]);

  const { isPending } = useQuery({
    queryFn: () =>
      fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete")
        .then((res) => res.json())
        .then((r) => setOptions(r)),
  });

  const calc = () => {
    setCalcResult(eval(result));
  };

  if (isPending) return <div>Loading...</div>;
  else
    return (
      <>
        <div style={{ width: "80vw", margin: "20px auto" }}>
          <h1>Expression Evaluator</h1>
        </div>
        <div style={{ width: "80vw", margin: "20px auto" }}>
          <Select
            multi
            create
            values={items}
            options={options}
            labelField="name"
            valueField="value"
            onChange={(values) => handleChange(values)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80vw",
            margin: "20px auto",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          <button onClick={() => calc()}>Evaluate</button>
          <div>Value: {calcResult}</div>
        </div>
        <div style={{ width: "80vw", margin: "20px auto" }}>
          {options.length > 0 &&
            options.map((i) => {
              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ fontWeight: "bold", marginRight: "10px" }}>
                    {i.name}
                  </div>
                  <div>{i.value}</div>
                </div>
              );
            })}
        </div>
      </>
    );
}

export default Calculator;
