import { useEffect, useRef, KeyboardEvent, JSX } from "react";

type BasePropsEdit = {
  id: string;
  teachMeUseHoc: () => void;
  handleChange: (
    e: KeyboardEvent<HTMLInputElement>,
    id: string,
    teachMeUseHoc: () => void
  ) => Promise<void>;
};

const EditTodoLogger = (props: BasePropsEdit): JSX.Element => {
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
