import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { toggleTheme } from "../Redux/slice/themeSlice";
import { useEffect } from "react";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.reducer.theme.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);
  return (
    <button onClick={handleToggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};
export default ThemeSwitch;
