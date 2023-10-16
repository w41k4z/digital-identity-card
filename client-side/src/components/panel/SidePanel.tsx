/* COMPONENTS */
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

/* STYLES */
import "./style.css";

interface SidePanelProps {
  bootstrapClass?: string;
  header: ReactNode;
  panelItems: {
    title: string;
    type: string; // nav-item | menu-title
    icon?: ReactNode; // react-icons
    path?: string;
    onItemClick: () => void;
  }[];
  currentPageIndex?: number;
}

const SidePanel = ({
  bootstrapClass = "d-flex flex-column flex-shrink-0 px-2 py-3 bg-light sticky-top",
  header,
  panelItems,
  currentPageIndex = 0,
}: SidePanelProps) => {
  /* HOOKS SECTION */
  const [activeItem, setActiveItem] = useState(currentPageIndex);

  return (
    <div className={"side-panel " + bootstrapClass}>
      {header}
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {panelItems.map((item, index) => {
          return item.type === "menu-title" ? (
            <li
              className={item.type + " my-2 d-none d-md-block"}
              key={"section-" + index}
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              {item.title}
            </li>
          ) : (
            <li
              className={item.type}
              key={"item-" + index}
              onClick={() => {
                setActiveItem(index);
                item.onItemClick();
              }}
              style={{ cursor: "pointer" }}
            >
              <Link
                className={
                  activeItem === index
                    ? "nav-link active d-flex align-items-center"
                    : "nav-link text-dark d-flex align-items-center"
                }
                to={item.path ? item.path : "/"}
              >
                <span
                  className="d-flex align-items-center"
                  style={{ fontSize: "20px" }}
                >
                  {item.icon}
                </span>
                <p className="m-0 ms-3 d-none d-md-block">{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidePanel;
