import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();

  const handleNavigateProject = () => {
    //router.push("/clients/ped/projecta");
    router.push({
      pathname: "/clients/[id]/[clientProjectId]",
      query: { id: "ped", clientProjectId: "Project A" },
    });
  };

  return (
    <div>
      <h1>ClientProjectsPage</h1>

      <button onClick={handleNavigateProject}>Navigate to Project</button>
    </div>
  );
};

export default ClientProjectsPage;
