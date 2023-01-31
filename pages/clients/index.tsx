import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "ped", name: "Pedro" },
    { id: "alex", name: "Oleksandr" },
  ];
  return (
    <div>
      <h1>Clients Page</h1>

      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
