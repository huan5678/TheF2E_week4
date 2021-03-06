import React,{useState} from 'react'
import Logo from "../images/The F2E.svg";
import { useSalaryContext } from "../context/index";

function TabInfo() {
  return (
    <ul className="flex items-center gap-2 rounded border border-gay-light p-2">
      <TabButton title="基本資料" />
      <TabButton title="薪資與產業" />
    </ul>
  );

  function TabButton({ title }) {
    const { tabTarget, setTabTarget } = useSalaryContext();
    const handleSetSelected = () => {
      setTabTarget(title);
    };
    return (
      <li
        className={`py-2 px-6 rounded cursor-pointer ${
          tabTarget === title ? "bg-white text-secondary" : "text-gray-dark"
        }`}
        onClick={handleSetSelected}
      >
        {title}
      </li>
    );
  }
}

function DropdownFilter() {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const listGroup = [
    {
      title: "依從業人數 高至低",
      filter: () => {},
    },
    {
      title: "依平均年薪 高至低",
      filter: () => {},
    },
    { title: "依平均年薪 低至高", filter: () => {} },
    { title: "依平均滿意度 高至低", filter: () => {} },
    { title: "依平均滿意度 低至高", filter: () => {} },
  ];

  const [filterTarget, setFilterTarget] = useState("依從業人數 高至低");
  return (
    <div
      className={`relative bg-secondary rounded text-white w-64
      `}
    >
      <button
        type="button"
        className="p-6 flex justify-between items-center min-w-full"
        onClick={handleDropdown}
      >
        {filterTarget}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="text-white"
          viewBox="0 0 16 16"
        >
          <path
            className={`origin-center transition-all duration-200 ease-in-out	${
              showDropdown ? "rotate-0" : "rotate-180"
            }`}
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </button>
      <ul
        className={`absolute top-0 left-0 mt-24 min-w-max w-64
      flex flex-col border border-white
      divide-y divide-primary-dark bg-secondary
      transition-all duration-300 ease-in-out z-10
      ${
        showDropdown
          ? "opacity-100 translate-y-0 overflow-visible"
          : "opacity-0 invisible -translate-y-8 overflow-hidden"
      }
      `}
      >
        {listGroup.map((item, index) => (
          <List
            key={index}
            {...item}
            filterTarget={filterTarget}
            setFilterTarget={setFilterTarget}
            handleDropdown={handleDropdown}
          />
        ))}
      </ul>
    </div>
  );
}

const List = (props) => {
  const handleClick = () => {
    props.filter();
    props.setFilterTarget(props.title);
    props.handleDropdown();
  };
  return (
    <li
      className="py-4 px-6 flex justify-between items-center text-white hover:bg-primary-dark active:bg-gray-dark"
      onClick={handleClick}
    >
      {props.title}
      {props.filterTarget === props.title ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : null}
    </li>
  );
};

const Header = () => {

  const [isOpenDropdown ,setIsOpenDropdown] = useState(false);

  const { setTarget , target } = useSalaryContext();

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  }

  const handleFrontEnd = () => {
    handleDropdown();
    setTarget(() => "前端薪資調查報告");
  }

  const handleUiUx = () => {
    handleDropdown();
    setTarget(() => "UIUX薪資調查報告");
  }

  return (
    <header className="container">
      <nav className="flex justify-between items-center text-white">
        <div className="flex items-center">
          <a href="/" className="mr-24">
            <img src={Logo} alt="The F2E" />
          </a>
          <h2 className="mr-12">修煉精神時光屋</h2>
          <div className="relative">
            <button
              type="button"
              onMouseEnter={handleDropdown}
              className="py-6 pr-6"
            >
              薪資調查報告
            </button>
            <ul
              className={`absolute mt-2 left-0 w-60 border border-white
                rounded bg-secondary
                grid grid-cols-1 items-start
                divide-y divide-primary-dark
                transition-all duration-300
                ${
                  isOpenDropdown
                    ? "opacity-100 translate-y-0 overflow-visible"
                    : "opacity-0 invisible -translate-y-8 overflow-hidden"
                }
                `}
              onMouseLeave={handleDropdown}
            >
              {isOpenDropdown && (
                <>
                  <li>
                    <button
                      type="button"
                      className="text-left pt-5 pb-4 pl-6"
                      onClick={handleFrontEnd}
                    >
                      前端薪資調查報告
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-left pt-5 pb-4 pl-6"
                      onClick={handleUiUx}
                    >
                      UI 薪資調查報告
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <a href="/" className="text-primary">
          Login
        </a>
      </nav>
      <section className="container py-14">
        <h1 className="text-center text-h1 text-white mb-14">{target}</h1>
        <div className="flex justify-center items-center relative">
          <TabInfo />
          <div className="absolute top-0 right-0 -translate-y-[10%]">
            <DropdownFilter />
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header
