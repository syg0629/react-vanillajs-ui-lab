import { useState } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li className={cx("item", { current })} key={id}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      {/* current가 있을 때만 HTML을 불러옴 */}
      {/* current가 없을 때는 렌더링이 되지 않으니 SEO 불리 */}
      {current ? <div className={cx("description")}>{description}</div> : null}
    </li>
  );
};

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #1. React<sub>현재 desc만 html로 그리기</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map((d) => (
          <AccordionItem
            key={d.id}
            {...d}
            current={currentId === d.id}
            toggle={toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};
export default Accordion1;
