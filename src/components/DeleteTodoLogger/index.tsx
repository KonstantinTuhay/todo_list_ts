import { JSX } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteToDoMutation } from "../../apiRQuery";

type DeleteProps = {
  id: string;
  teachMeUseHoc: any;
};

const DeleteTodoLogger = (props: DeleteProps): JSX.Element => {
  const { id, teachMeUseHoc } = props;

  const [deleteTask] = useDeleteToDoMutation();

  const deleteTodo = async (
    id: string
    // teachMeUseHoc: () => void
  ): Promise<void> => {
    await deleteTask(id);
    teachMeUseHoc();
  };

  return (
    <>
      <MdDeleteOutline {...props} onClick={() => deleteTodo(id)} />
    </>
  );
};

export default DeleteTodoLogger;
