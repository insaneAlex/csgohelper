import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
  const router = useRouter();
  console.log(router.query);
  const { id, clientProjectId } = router.query;

  return (
    <div>
      <h1>{`Project Page for project ${clientProjectId} for ${id}`}</h1>
    </div>
  );
};

export default SelectedClientProjectPage;
