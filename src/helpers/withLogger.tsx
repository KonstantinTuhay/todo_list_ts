import { ComponentType } from "react";

type BaseProps = {
  note?: string;
  text?: string;
  value?: string;
  teachMeUseHoc?: () => void;
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
