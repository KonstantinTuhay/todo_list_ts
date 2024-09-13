import { KeyboardEvent, useEffect, useRef } from "react";
import { useIsUpdatedTaskMutation } from "../../apiRQuery";
import { previousEditTask } from "../redux/slices/previousEditSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { editTask } from "../redux/slices/editSlices";

type EditProps = {
  id: string;
  teachMeUseHoc: any;
};

const EditTodoLogger = (props: EditProps) => {
  const focusOnEditInput = useRef<HTMLInputElement>(null);

  const { id, teachMeUseHoc } = props;

  useEffect(() => {
    focusOnEditInput.current?.focus();
  }, []);

  const previousEdit = useAppSelector((state) => state.previousEditSlice);

  const dispatch = useAppDispatch();

  const [isUpdatedTask, { isLoading }] = useIsUpdatedTaskMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChange = async (
    event: KeyboardEvent<HTMLInputElement>,
    id: string
    // teachMeUseHoc: () => void
  ): Promise<void> => {
    if (event.key === "Enter") {
      teachMeUseHoc();
      const updatedTask = { title: previousEdit };
      await isUpdatedTask({ id, updatedTask });
      dispatch(editTask(null));
    }
  };

  return (
    <>
      <input
        {...props}
        ref={focusOnEditInput}
        onChange={(e) => {
          dispatch(previousEditTask(e.target.value));
        }}
        onKeyDown={(e) => handleChange(e, id)}
      />
    </>
  );
};

export default EditTodoLogger;
