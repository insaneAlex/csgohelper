import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();

  const handleNavigateProject = () => {
    //router.push("/clients/ped/projecta");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "ped", clientprojectid: "projecta" },
    });
  };

  return (
    <div>
      <h1>Client Projects Page</h1>

      <button onClick={handleNavigateProject}>Navigate to Project</button>
    </div>
  );
};

export default ClientProjectsPage;
