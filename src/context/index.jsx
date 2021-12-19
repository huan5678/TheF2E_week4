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
  const [totalNum, setTotalNum] = useState(0);
  const [areaPerson, setAreaPerson] = useState([]);
  const [genderData , setGenderData] = useState([]);

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
    let areaData = [];
    let manNum = 0;
    let womanNum = 0;
    apiData
      .then((res) => {
        setSalaryData(res.data);
        data = res.data;
        setTotalNum(data.length);
        data.map((item) => {
          areaList.push(item.company.area);
          item.gender === "男性"
            ? (manNum = manNum+1)
            : (womanNum = womanNum+1);
        });
        console.log(manNum,womanNum);
        setMaleNum(manNum);
        setFemaleNum(womanNum);
        setArea([...new Set(areaList)]);
        let areaPersonData = {};
        areaList= [...new Set(areaList)];
        data.forEach((item) => {
          if (areaPersonData[item.company.area]) {
            areaPersonData[item.company.area] += 1;
          } else {
            areaPersonData[item.company.area] = 1;
          }
        });
        let areaPersonDataResult = [];
        areaPersonDataResult = Object.entries(areaPersonData).map(([place, numbers]) => {
          return { name: place, value: numbers };
        });

        setAreaPerson(areaPersonDataResult);

          setGenderData([
            {
              name: "男性",
              value: manNum,
            },
            {
              name: "女性",
              value: womanNum,
            },
          ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [target]);






  return (
    <salaryContext.Provider
      value={{
        salaryData,
        area,
        target,
        setTarget,
        tabTarget,
        setTabTarget,
        areaPerson,
        maleNum,
        femaleNum,
        totalNum,
        genderData,
      }}
    >
      {children}
    </salaryContext.Provider>
  );
}

export const useSalaryContext = () => useContext(salaryContext);