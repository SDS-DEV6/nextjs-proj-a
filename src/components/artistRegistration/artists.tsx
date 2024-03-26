"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import ShowArtistInfo from "./showArtistInfo";
import DefaultImage from "@/assets/piku-ad.png";

interface RegisterProps {
  artist: {
    artistId: string;
    profileUrl: string | null;
    coverProfileUrl: string | null;
    username: string;
    aboutMe: string;
    email: string;
    emailVerified: boolean;
    emailVerifiedAt: string;
    firstName: string;
    lastName: string;
    suffix: string;
    verifiedStatus: boolean;
  };
}

const Artists = (props: PropsWithChildren<RegisterProps>) => {
  const router = useRouter();

  const [openArtistInfoModal, setOpenArtistInfoModal] = useState(false);

  return (
    <div>
      <li className="p-3 my-5 rounded-md" id={props.artist.artistId}>
        <div className="flex items-center">
          <div className="artist-image-container">
            <Image
              src={props.artist.profileUrl ?? DefaultImage}
              alt="artist profile image"
              width={100}
              height={100}
            />
          </div>

          <div className="artist-info-container">
            <h1>PenName: {props.artist.username}</h1>

            <button
              onClick={() => setOpenArtistInfoModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              View Artist Info
            </button>
          </div>
        </div>
      </li>

      {openArtistInfoModal && (
        <ShowArtistInfo
          openArtistInfoModal={openArtistInfoModal}
          setOpenArtistInfoModal={setOpenArtistInfoModal}
          artist={props.artist}
          router={router}
        />
      )}
    </div>
  );
};

export default Artists;
