import React, { useEffect, useRef } from "react";
import { useIsUpdatedTaskMutation } from "../../apiRQuery";
import { useSelector, useDispatch } from "react-redux";
import { previousEditTask } from "../redux/slices/previousEditSlice";

const EditTodoLogger = (props) => {
  const previousEdit = useSelector((state) => state.previousEditSlice);

  const dispatch = useDispatch();

  const [isUpdatedTask, { isLoading }] = useIsUpdatedTaskMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChange = async (event, id, teachMeUseHoc) => {
    if (event.key === "Enter") {
      teachMeUseHoc();
      const updatedTask = { title: previousEdit };
      await isUpdatedTask({ id, updatedTask });
      dispatch(editTask(null));
    }
  };

  const focusOnEditInput = useRef(null);

  const { id, teachMeUseHoc } = props;

  useEffect(() => {
    focusOnEditInput.current.focus();
  }, []);
  return (
    <>
      <input
        handleChange={handleChange}
        {...props}
        ref={focusOnEditInput}
        onChange={(e) => {
          dispatch(previousEditTask(e.target.value));
        }}
        onKeyDown={(e) => props.handleChange(e, id, teachMeUseHoc)}
      />
    </>
  );
};

export default EditTodoLogger;
