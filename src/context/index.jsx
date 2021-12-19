import { useState, useEffect, useReducer, useContext, createContext } from "react";
import axios from "axios";

const salaryContext = createContext();

export const SalaryContextProvider = ({ children }) => {

  const [salaryData, setSalaryData] = useState([]);
  const [uiSalary, setUiSalary] = useState([]);
  const [target, setTarget] = useState("前端薪資調查報告");
  const [tabTarget, setTabTarget] = useState("基本資料");
  const [area , setArea] = useState([]);
  const [maleNum, setMaleNum] = useState(0);
  const [femaleNum, setFemaleNum] = useState(0);
  const [areaPerson, setAreaPerson] = useState([]);

  useEffect(() => {
    let urlTarget = "";
    target === "前端薪資調查報告"
      ? (urlTarget = "frontend_data")
      : (urlTarget = "ui_data");

    const apiData = axios.get(
      `https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/${urlTarget}.json`
    );

    let data = [];
    let areaList = [];
    apiData
      .then((res) => {
        setSalaryData(res.data);
        data = res.data;

        data.map((item) => {
          areaList.push(item.company.area);
          item.gender === "男性"
            ? setMaleNum(()=>maleNum + 1)
            : setFemaleNum(()=>femaleNum + 1);
        });
        setArea([...new Set(areaList)]);

        data.map((item) => {
          area.map((place) => {
            if (item.company.area === place) {
              setAreaPerson(() => {
                [...areaPerson, item];
              });
            }
            })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [target]);






  return (
    <salaryContext.Provider
      value={{ salaryData, area, target, setTarget, tabTarget, setTabTarget, areaPerson, maleNum, femaleNum }}
    >
      {children}
    </salaryContext.Provider>
  );
}

export const useSalaryContext = () => useContext(salaryContext);