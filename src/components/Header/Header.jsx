import React, { useContext } from "react";
import { TbNotebook } from "react-icons/tb";
import { BsFillSunFill } from "react-icons/bs";
import { HiOutlineMoon } from "react-icons/hi";
import { ThemeContext } from "../../Themeprovider";

const Header = () => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center">
      <div className="text-4xl">
        <TbNotebook />
      </div>

      <div className="flex items-center gap-2">
        <div className="divider lg:divider-horizontal"></div>
        <input
          type="checkbox"
          className="toggle toggle-sm toggle-success"
          onChange={toggleTheme}
        />
        <div className="text-slate-500 text-xl">
          {isDarkTheme ? <BsFillSunFill /> : <HiOutlineMoon />}
        </div>
      </div>
    </div>
  );
};

export default Header;