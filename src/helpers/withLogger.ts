import React from "react";

const withLogger = (WrappedComponent) => {
  return (props) => {
    const { note, text, value } = props;
    const teachMeUseHoc = () => {
      let date = new Date();
      let stringDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      console.log(`${stringDate} ${note} ${text || value}`);
    };

    return <WrappedComponent {...props} teachMeUseHoc={teachMeUseHoc} />;
  };
};

export default withLogger;
