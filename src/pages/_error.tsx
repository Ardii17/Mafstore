import { NextPageContext } from "next";
import { ErrorProps } from "next/error";

const CustomErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div className="w-screen h-screen bg-cover bg-center" style={{backgroundImage: 'url(./../Random/background.jpg)'}}>
    </div>
  );
};

CustomErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
