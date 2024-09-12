import { JSX } from "react";
import { MdDeleteOutline } from "react-icons/md";

type BasePropsDelete = {
  id: string;
  teachMeUseHoc: () => void;
  deleteTodo: (id: string, teachMeUseHoc: () => void) => void;
  text: string;
  note: string;
};

const DeleteTodoLogger = (props: BasePropsDelete): JSX.Element => {
  const { id, teachMeUseHoc } = props;
  return (
    <>
      <MdDeleteOutline
        {...props}
        onClick={() => props.deleteTodo(id, teachMeUseHoc)}
      />
    </>
  );
};

export default DeleteTodoLogger;
