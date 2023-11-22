
import "@/assets/styles/progressBar.css";
import Link from "./Link";
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};
const SideBar = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <div className="side-bar-flex-ctn">
      <div className="side-bar-ctn">
        <ul>
          <li>
            <div
              className={`${
                selectedPage === ("personaldetails" as SelectedPage)
                  ? "circle active"
                  : "circle"
              }`}
            ></div>
            <Link
              page="Personal Details"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>
          <li>
            <div
              className={`${
                selectedPage === ("education" as SelectedPage)
                  ? "circle active"
                  : "circle"
              }`}
            ></div>
            <Link
              page="Education"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>
          <li>
            <div
              className={`${
                selectedPage === ("experience" as SelectedPage)
                  ? "circle active"
                  : "circle"
              }`}
            ></div>
            <Link
              page="Experience"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>
          <li>
            <div
              className={`${
                selectedPage === ("projects" as SelectedPage)
                  ? "circle active"
                  : "circle"
              }`}
            ></div>

            <Link
              page="Projects"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>

          <li>
            <div
              className={`${
                selectedPage === ("skills" as SelectedPage)
                  ? "circle active"
                  : "circle"
              }`}
            ></div>
            <Link
              page="Skills"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>
          <li>
            <div
              className={`${
                selectedPage === ("others" as SelectedPage)
                  ? "circle active last"
                  : "circle last"
              }`}
            ></div>
            <Link
              page="Certificates"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
