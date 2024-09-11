import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const DeleteTodoLogger: React.FC = (props): JSX.Element => {
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
