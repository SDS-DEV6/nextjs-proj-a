async function getApplications() {
  const res = await fetch(`http://localhost:3000/api/novels`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch novels");
  }

  return res.json();
}

const NovelsPage = async () => {
  const applications = await getApplications();
  return (
    <div>
      <div>
        <h1>Pending Novel Approvals</h1>
        {/* <ListArtistApplications artists={applications} /> */}
      </div>

      <div>
        <h1>Pending Chapter Approvals</h1>
        {/* <ListArtistApplications artists={applications} /> */}
      </div>
    </div>
  );
};

export default NovelsPage;
