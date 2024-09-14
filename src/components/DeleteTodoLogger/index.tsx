import { JSX } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteToDoMutation } from "../../apiRQuery";

interface TodoInputProps {
  id: string;
  teachMeUseHoc: () => void;
}

const DeleteTodoLogger: React.FC<TodoInputProps> = (props): JSX.Element => {
  const { id, teachMeUseHoc } = props;

  const [deleteTask] = useDeleteToDoMutation();

  const deleteTodo = async (id: string): Promise<void> => {
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
