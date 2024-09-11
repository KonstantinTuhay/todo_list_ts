import React, { useEffect, useRef } from "react";

const EditTodoLogger: React.FC = (props): JSX.Element => {
  const focusOnEditInput = useRef<HTMLInputElement>(null);

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
