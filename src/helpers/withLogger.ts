import { ComponentType } from "react";

type BaseProps = {
  id?: string;
  note: string;
  text?: string;
  value?: string;
};

type InjectedProps = {
  teachMeUseHoc: () => void;
};

function withLogger<BaseProps>(
  WrappedComponent: ComponentType<BaseProps>
): ComponentType<BaseProps & InjectedProps> {
  return (props: BaseProps) => {
    const { note, text, value } = props;
    const teachMeUseHoc = (): void => {
      let date: Date = new Date();
      let stringDate: string = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      console.log(`${stringDate} ${note} ${text || value}`);
    };
    // <WrappedComponent {...props} teachMeUseHoc={teachMeUseHoc} />;

    return <WrappedComponent {...props} teachMeUseHoc={teachMeUseHoc} />;
  };
}

export default withLogger;
