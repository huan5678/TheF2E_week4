import { useState, useEffect, useReducer, useContext, createContext } from "react";
import axios from "axios";

const salaryContext = createContext();

export const SalaryContextProvider = ({ children }) => {

  const [salaryData, setSalaryData] = useState([]);
  const [target, setTarget] = useState("前端薪資調查報告");
  const [tabTarget, setTabTarget] = useState("基本資料");
  const [area , setArea] = useState([]);
  const [maleNum, setMaleNum] = useState(0);
  const [femaleNum, setFemaleNum] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [areaPerson, setAreaPerson] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [majorData, setMajorData] = useState([]);

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
    let manNum = 0;
    let womanNum = 0;
    let ageList = [];
    let educationList = [];
    let majorList = [];
    apiData
      .then((res) => {
        setSalaryData(res.data);
        data = res.data;
        setTotalNum(data.length);
        data.map((item) => {
          areaList.push(item.company.area);
          item.gender === "男性"
            ? (manNum = manNum+1)
            : (womanNum = womanNum + 1);
          ageList.push(item.age);
          educationList.push(item.education);
          majorList.push(item.major);
        });
        // console.log(manNum,womanNum);
        setMaleNum(manNum);
        setFemaleNum(womanNum);
        setArea([...new Set(areaList)]);
        ageList = [...new Set(ageList)];
        educationList = [...new Set(educationList)];
        majorList = [...new Set(majorList)];
        // console.log(educationList);
        // console.log(ageList);
        // console.log(majorList);
        let areaPersonData = {};
        areaList = [...new Set(areaList)];
        let ageDataObj = {};
        data.forEach((item) => {
          if (areaPersonData[item.company.area]) {
            areaPersonData[item.company.area] += 1;
          } else {
            areaPersonData[item.company.area] = 1;
          }
          if (ageDataObj[item.age]) {
            ageDataObj[item.age] += 1;
          } else {
            ageDataObj[item.age] = 1;
          }
        });
        let majorUndergraduateDepartment = {};
        let majorNotUndergraduateDepartment = {};
        let majorUndergraduateDepartmentData = [];
        let majorNotUndergraduateDepartmentData = [];
        majorUndergraduateDepartmentData = data.filter((item) =>
          item.major.match(/[^非資][資]|程式/g)
        );
        majorNotUndergraduateDepartmentData = data.filter((item) =>
          !item.major.match(/[^非資][資]|程式/g)
        );
        // console.log(majorUndergraduateDepartmentData);
        // console.log(majorNotUndergraduateDepartmentData);
        majorUndergraduateDepartmentData.forEach((item) => {
          if (majorUndergraduateDepartment['碩博士'] && (item.education === '碩士畢業' || item.education === '博士畢業')) {
            majorUndergraduateDepartment['碩博士'] += 1;
          } else {
            majorUndergraduateDepartment['碩博士'] = 1;
          }
          if (majorUndergraduateDepartment['大學（含）以下'] && (item.education !== '碩士畢業' || item.education !== '博士畢業')) {
            majorUndergraduateDepartment['大學（含）以下'] += 1;
          } else {
            majorUndergraduateDepartment['大學（含）以下'] = 1;
          }
        });
        majorNotUndergraduateDepartmentData.forEach((item) => {
          if (majorNotUndergraduateDepartment['碩博士'] && (item.education === '碩士畢業' || item.education === '博士畢業')) {
            majorNotUndergraduateDepartment['碩博士'] += 1;
          } else {
            majorNotUndergraduateDepartment['碩博士'] = 1;
          }
          if (majorNotUndergraduateDepartment['大學（含）以下'] && (item.education !== '碩士畢業' || item.education !== '博士畢業')) {
            majorNotUndergraduateDepartment['大學（含）以下'] += 1;
          } else {
            majorNotUndergraduateDepartment['大學（含）以下'] = 1;
          }
        });
        // console.log(majorUndergraduateDepartment);
        // console.log(majorNotUndergraduateDepartment);
        majorUndergraduateDepartment.name = "資工科管";
        majorNotUndergraduateDepartment.name = "非本科";

        let majorDataResult = [];
        majorDataResult.push(majorUndergraduateDepartment);
        majorDataResult.push(majorNotUndergraduateDepartment);
        // console.log(majorDataResult);

        setMajorData(majorDataResult);


        let ageDataResult = [];
        ageDataResult = Object.entries(ageDataObj).map(([age, numbers]) => {
          return { name: age, value: numbers };
        });
        setAgeData(ageDataResult);

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
        ageData,
        majorData,
      }}
    >
      {children}
    </salaryContext.Provider>
  );
}

export const useSalaryContext = () => useContext(salaryContext);