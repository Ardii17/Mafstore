import { NextPageContext } from "next";
import { ErrorProps } from "next/error";

const CustomErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Terjadi kesalahan. Halaman tidak ditemukan.</p>
    </div>
  );
};

CustomErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
