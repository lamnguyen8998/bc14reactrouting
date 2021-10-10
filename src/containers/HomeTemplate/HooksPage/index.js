import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Child from "./child";
import CustomHooks from "./custom-hooks";
import DemoUseReducer from "./demoUseReducer";

export default function HooksPage() {
  const preNumber = useRef(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("useEffect");
  });

  useEffect(() => {
    console.log(
      "useEffect -  Tương đương như Didmount bên class -  nếu tham số thứ 2 là mảng rỗng"
    );
  }, []);

  useEffect(() => {
    console.log(
      "useEffect -  Tương đương như Didupdate bên class - nếu tham số thứ 2 là mảng khác rỗng "
    );
  }, [number]);

  useEffect(() => {
    const invterval = setInterval(() => {
      console.log("hello");
    }, 5000);
    return () => {
      // Tương đương như WillUnmount bên class
      clearInterval(invterval);
    };
  }, []);

  const showNumber = () => {
    console.log("showNumber");
  };

  const showNumberCallback = useCallback(showNumber, []);

  const numberUp = () => {
    let i = 0;
    while (i < 1000) i++;
    console.log(i);
    return i;
  };

  const numberUpMemo = useMemo(() => numberUp(), []);

  return (
    <div>
      <h3>HooksPage</h3>
      <h1>Pre number: {preNumber.current} </h1>
      <h1>Number: {number}</h1>
      <button
        className="btn btn-success"
        onClick={() => {
          setNumber(number + 1);
          preNumber.current = number;
        }}
      >
        Increment
      </button>
      <h1>Number Up : {numberUpMemo}</h1>
      <hr />

      <Child showNumber={showNumberCallback} />
      <DemoUseReducer />
      <CustomHooks />
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  );
}
