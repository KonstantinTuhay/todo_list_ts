import { JSX, ComponentType } from "react";

type WithLoggerProps = {
  id?: string;
  note?: string;
  text?: string;
  value?: string;
};

type TeachMeUseHoc = () => void;

const withLogger = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P & WithLoggerProps): JSX.Element => {
    const { note, text, value } = props;
    const teachMeUseHoc: TeachMeUseHoc = () => {
      const date: Date = new Date();
      const stringDate: string = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      console.log(`${stringDate} ${note} ${text || value}`);
    };
    return <WrappedComponent {...(props as P)} teachMeUseHoc={teachMeUseHoc} />;
  };
};

export default withLogger;
