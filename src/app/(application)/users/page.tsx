import ListArtistApplications from "@/components/artistRegistration/listArtist";

async function getApplications() {
  const res = await fetch(`http://localhost:3000/api/artists`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artist applications");
  }

  return res.json();
}

const DashboardPage = async () => {
  const applications = await getApplications();
  return (
    <div>
      <h1>Pending Applications</h1>
      <ListArtistApplications artists={applications} />
    </div>
  );
};

export default DashboardPage;
