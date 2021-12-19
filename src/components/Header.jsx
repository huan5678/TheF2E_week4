import React,{useState} from 'react'
import Logo from "../images/The F2E.svg";
import { useSalaryContext } from "../context/index";

const Header = () => {

  const [isOpenDropdown ,setIsOpenDropdown] = useState(false);

  const { setTarget } = useSalaryContext();

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
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
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
    </header>
  );
}

export default Header
