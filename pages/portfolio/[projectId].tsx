import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router);
  console.log(router.query);
  console.log(router.pathname);

  return (
    <div>
      <h2>Portfolio Project Page</h2>
    </div>
  );
};

export default PortfolioProjectPage;
