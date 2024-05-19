import { useEffect, useRef } from "react";

export function useOutsideClick({ handler, listenCapturing = true }) {
  const ref = useRef();

  // Global event listeners, to onClick outside the Modal box the box will close
  useEffect(() => {
    function handleClick(e) {
      // console.log(ref.current);
      // console.log(e.target);
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log("clicked happen outside");
        handler();
      }
    }
    // the true is an option in the EventListener, it is to change to I want the event to listen on capturing phase.
    // the false is the bubbling phase of the component tree
    document.addEventListener("click", handleClick, listenCapturing);

    // Remove the event listener as the event unmounts
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
