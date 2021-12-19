import { useSalaryContext } from './context/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Card from './components/Card';
function App() {

  const { salaryData, area, areaPerson, maleNum, femaleNum } =
    useSalaryContext();

  console.log('資料', salaryData);
  console.log('地區', area);
  console.log('地區人數', areaPerson);
  console.log('男性', maleNum);
  console.log('女性', femaleNum);


  return (
    <main>
      <Header />
      <Hero />
      <div className="container flex flex-wrap justify-between gap-x-5 gap-y-10">
        <Card
          title="地區"
          data={{
            type: "bar",
            data: {
              labels: [...area],
              datasets: [
                {
                  data: [],
                  backgroundColor: ["#8E7DFA"],
                },
              ],
            },
          }}
          className={`w-full md:w-1/2`}
        />
        {/* <Card
          title="年齡"
          data={{
            type: "line",
            data: {},
          }}
          className={`w-full md:w-1/2`}
        /> */}
        <Card
          title="性別比例"
          data={{
            type: "pie",
            data: {
              labels: ["男性", "女性"],
              datasets: [
                {
                  data: [maleNum, femaleNum],
                  backgroundColor: ["#D2CBFD", "#8E7DFA"],
                },
              ],
            },
          }}
          className={`w-full md:w-1/2`}
        />
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
