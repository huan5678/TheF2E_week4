import { useSalaryContext } from './context/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import ChartComponent from "./components/ChartComponent";
import {ResponsiveContainer, Bar, Legend} from 'recharts';

function App() {

  const { salaryData, area, maleNum, femaleNum, totalNum, genderData, areaPerson, ageData, majorData } =
    useSalaryContext();

  console.log('資料', salaryData);
  console.log('地區', area);
  console.log('男性', maleNum);
  console.log('女性', femaleNum);
  console.log('總人數', totalNum);
  console.log('地區人數', areaPerson);
  console.log("年齡人數", ageData);
  console.log("學歷人數", majorData);

  return (
    <main>
      <Header />
      <div className="container flex flex-wrap justify-between gap-x-5 gap-y-10">
        <Card title="地區" className={`w-full`}>
          <ChartComponent
            data={{
              type: "bar",
              data: areaPerson,
              dataKey: "value",
              unit: "人",
              gridHorizontal: true,
              XAxis: { dataKey: "name" },
              YAxis: { type: "number" },
            }}
          />
        </Card>

        <Card title="年齡" className={`w-1/2 flex-1`}>
          <ChartComponent
            data={{
              type: "bar",
              data: ageData,
              dataKey: "value",
              unit: "人",
              gridHorizontal: true,
              XAxis: { dataKey: "name" },
              YAxis: { type: "number" },
            }}
          />
        </Card>

        <Card title="性別比例" className={`w-1/2 flex-1`}>
          <div className="flex justify-center items-center">
            <div className="text-white text-right">
              <h3>女</h3>
              {Number((femaleNum / totalNum) * 100).toFixed(0)}%
            </div>
            <ChartComponent
              data={{
                type: "pie",
                data: genderData,
                unit: "人",
              }}
            />
            <div className="text-white text-right">
              <h3>男</h3>
              {Number((maleNum / totalNum) * 100).toFixed(0)}%
            </div>
          </div>
        </Card>
        <Card title="科系與學歷" className={`flex-1`}>
          <ChartComponent
            data={{
              type: "bar",
              layout: "vertical",
              data: majorData,
              unit: "人",
              XAxis: { type: "number" },
              YAxis: { dataKey: "name", type: "category" },
              gridVertical: true,
            }}
          >
            <Legend />
            <Bar dataKey="大學（含）以下" stackId={1} fill="#8E7DFA" />
            <Bar dataKey="碩博士" stackId={1} fill="#D2CBFD" />
          </ChartComponent>
        </Card>
        <Card title="第一份工作所採用之技術/軟體" className={`w-full`}></Card>
      </div>
      <Footer />
    </main>
  );
}

export default App
