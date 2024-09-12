import { ComponentType, KeyboardEvent, ChangeEvent } from "react";

type BaseProps = {
  id?: string;
  note?: string;
  text?: string;
  value?: string;
  teachMeUseHoc?: () => void;
  deleteTodo?: (id: string, teachMeUseHoc: () => void) => void;
  handleChange?: (
    e: KeyboardEvent<HTMLInputElement>,
    id: string,
    teachMeUseHoc: () => void
  ) => Promise<void>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const withLogger = (
  WrappedComponent: ComponentType<BaseProps>
): ComponentType<BaseProps> => {
  return (props: BaseProps) => {
    const { note, text, value } = props;
    const teachMeUseHoc = (): void => {
      const date = new Date();
      const stringDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      console.log(`${stringDate} ${note} ${text || value}`);
    };

    return <WrappedComponent {...props} teachMeUseHoc={teachMeUseHoc} />;
  };
};

export default withLogger;
