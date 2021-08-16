import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import { csvData } from "./Api";
import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

const App = () => {
  const [data, setData] = useState([]);
  const [type, SetType] = useState("A");

  const dataCsv = () => {
    csvData()
      .then((res) => {
        var Typedata = res.filter((t) => t.Type == type);
        setData(Typedata);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const changeType = (e) => {
    e.preventDefault();
    var val = e.target.value;
    SetType(val);
  };

  useEffect(() => {
    dataCsv();
  }, [type]);

  return (
    <div>
      <form>
        <labe style={{ fontSize: "24px" }}>Select Type</labe>
        <select style={{ fontSize: "24px" }} onChange={changeType}>
          <option>Select type</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </form>
      <BarChart width={1330} height={550} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis dataKey="Number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Number" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default App;
