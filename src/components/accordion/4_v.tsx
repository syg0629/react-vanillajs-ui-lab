import cx from "./cx";
import data from "./data";
import VanillaWrapper from "../vanillaWrapper";

const itemBuilder = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("item"), cx("item3"));
  $li.setAttribute("data-id", id);

  const $tab = document.createElement("div");
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;

  const $description = document.createElement("div");
  $description.classList.add(cx("description"));
  $description.textContent = description;

  $li.append($tab, $description);
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  // currentId는 현재 열려 있는 아코디언의 ID를 저장하는 변수
  let currentId: string | null = null;  

  // $표시는 실제 DOM 요소(HTML Element)를 참조하는 변수임을 나타내는 관례
  const $ul = document.createElement("ul");
  $ul.classList.add(cx("container"));

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;
    if (!$el.classList.contains(cx("tab"))) return;

    const targetId = $el.parentElement!.dataset.id;
    if (!targetId) return;

    currentId = targetId === currentId ? null : targetId;

    $items.forEach(($item) => {
      $item.classList.toggle(cx("current"), currentId === $item.dataset.id);
    });
    // 첫 번째 아코디언을 클릭했을 때 자동으로 열리도록 설정
  };

  $ul.addEventListener("click", handleClickTab);

  const $items = data.map(itemBuilder);
  $ul.append(...$items);

  wrapper.append($ul);
  // 첫 번째 아코디언을 클릭했을 때 자동으로 열리도록 설정
  ($items[0].children[0] as HTMLElement).click();
};

const Accordion4V = () => <VanillaWrapper title="#4" initiator={initiator} />;
export default Accordion4V;
