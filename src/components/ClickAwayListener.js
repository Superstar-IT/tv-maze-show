import { useEffect, useRef } from "react";

const ClickAwayListener = (props) => {
  // Tracks the div HTML element under ref.current when it is assigned to the ref attribute in an HTML element
  const ref = useRef(null);

  const { clickAwayCallBack } = props;

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Do stuff when clicking outside the target div
      if (ref.current && !ref.current.contains(e.target)) {
        clickAwayCallBack();
      }
    };

    const handleKeydownOutside = (e) => {
      // Do stuff when keydown is outside the target div
      if (ref.current && !ref.current.contains(e.target)) {
        clickAwayCallBack();
      }
    };

    // Listener to detect click events or keydowns in the DOM
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydownOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydownOutside);
    };
  }, [clickAwayCallBack]);

  return (
    // ref attribute assigns the DOM node of this div and sets it as the ref.current property in the useRef variable provided
    <div ref={ref}>{props.children}</div>
  );
};

export default ClickAwayListener;
