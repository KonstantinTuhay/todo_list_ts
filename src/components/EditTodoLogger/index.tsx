import { useEffect, useRef, JSX } from "react";

const EditTodoLogger = (props): JSX.Element => {
  const focusOnEditInput = useRef<HTMLInputElement>(null);
  console.log(`------`, props);

  const { id, teachMeUseHoc } = props;

  useEffect(() => {
    focusOnEditInput.current?.focus();
  }, []);
  return (
    <>
      <input
        {...props}
        ref={focusOnEditInput}
        onKeyDown={(e) => props.handleChange(e, id, teachMeUseHoc)}
      />
    </>
  );
};

export default EditTodoLogger;
