import { useSalaryContext } from './context/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Card from './components/Card';
import ChartComponent from "./components/ChartComponent";
import {ResponsiveContainer} from 'recharts';

function App() {

  const { salaryData, area, maleNum, femaleNum, totalNum, genderData, areaPerson} =
    useSalaryContext();

  console.log('資料', salaryData);
  console.log('地區', area);
  console.log('男性', maleNum);
  console.log('女性', femaleNum);
  console.log('總人數', totalNum);
  console.log('地區人數', areaPerson);



  return (
    <main>
      <Header />
      <Hero />
      <div className="container flex flex-wrap justify-between gap-x-5 gap-y-10">
        <Card title="地區" className={`w-full`}>
              <ChartComponent
                data={{
                  type: "bar",
                  data: areaPerson,
                  dataKey: "value",
                  unit: "人",
                }}
            />
        </Card>
        {/* <Card
          title="年齡"
          data={{
            type: "line",
            data: {},
          }}
          className={`w-full md:w-1/2`}
        /> */}
        <Card title="性別比例" className={`w-full md:w-1/2`}>
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
        {/* <Card
          title="科系與學歷"
          data={{
            type: "line",
            data: {},
          }}
          className={`w-full md:w-1/2`}
        />
        <Card
          title="第一份工作所採用之技術/軟體"
          data={{
            type: "line",
            data: {},
          }}
          className={`w-full`}
        /> */}
      </div>
      <Footer />
    </main>
  );
}

export default App
