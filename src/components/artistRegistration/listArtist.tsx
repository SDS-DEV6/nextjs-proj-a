import Artists from "./artists";
import React, { useState, useEffect } from "react";

interface ArtistData {
  artistId: string;
  profileUrl: string;
  coverProfileUrl: string;
  username: string;
  email: string;
  emailVerified: boolean;
  emailVerifiedAt: string;
  firstName: string;
  lastName: string;
  suffix: string;
  verifiedStatus: boolean;
  aboutMe: string;
}

interface ListArtistApplications {
  artists: ArtistData[];
}

const ListArtistApplications = ({ artists }: ListArtistApplications) => {
  const displayPendingArtists = artists.filter(
    (artist) => artist.verifiedStatus === false
  );
  return (
    <div>
      <ul>
        {displayPendingArtists.map((artist) => (
          <Artists artist={artist} key={artist.artistId} />
        ))}
      </ul>
    </div>
  );
};

export default ListArtistApplications;
