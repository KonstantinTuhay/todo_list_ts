import { JSX } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteToDoMutation } from "../../apiRQuery";

type DeleteProps = {
  id: string;
  teachMeUseHoc: () => void;
};

const DeleteTodoLogger = (props: DeleteProps): JSX.Element => {
  const { id, teachMeUseHoc } = props;

  const [deleteTask] = useDeleteToDoMutation();

  const deleteTodo = async (id, teachMeUseHoc) => {
    await deleteTask(id);
    teachMeUseHoc();
  };

  return (
    <>
      <MdDeleteOutline
        {...props}
        onClick={() => deleteTodo(id, teachMeUseHoc)}
      />
    </>
  );
};

export default DeleteTodoLogger;
