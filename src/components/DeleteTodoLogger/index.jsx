import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const DeleteTodoLogger = (props) => {
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
