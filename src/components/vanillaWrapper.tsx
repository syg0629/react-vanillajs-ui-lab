import { useEffect, useRef } from "react";

// 리액트 컴포넌트이나 JavsScript구문을 실행해주는 함수를 전달받아서 함수를 컴포넌트 렌더링된 다음 한번만 그 함수를 실행해주는 목적의 래퍼
const VanillaWrapper = ({
  initiator,
}: {
  initiator: (wrapper: HTMLDivElement) => void;
}) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const isInit = useRef(false);

  useEffect(() => {
    if (!isInit.current && !!wrapper.current) {
      initiator(wrapper.current);
      isInit.current = true;
    }
  }, [initiator]);

  return <div ref={wrapper} />;
};

export default VanillaWrapper;
