import React, {
  useEffect,
  useState,
  useRef,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import DataModal from "../dataModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Approved from "./approveArtistReg";
import Rejected from "./denyArtistReg";
import DefaultImage from "@/assets/piku-ad.png";

interface ShowArtistInfoProps {
  openArtistInfoModal: boolean;
  setOpenArtistInfoModal: Dispatch<SetStateAction<boolean>>;
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
  router: any;
}

const ShowArtistInfo = (props: PropsWithChildren<ShowArtistInfoProps>) => {
  const router = useRouter();
  const [artist, setArtist] = useState<any>(props.artist);

  const [showForm, setShowForm] = useState(true);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    props.setOpenArtistInfoModal(false);
  };

  const toggleShowArtistInfoForm = (
    visible: boolean | ((prevState: boolean) => boolean)
  ) => {
    setShowForm(visible);
  };

  const handleApproveClick = () => {
    setShowForm(false);
    setOpenApproveModal(true);
  };

  const handleRejectClick = () => {
    setShowForm(false);
    setOpenRejectionModal(true);
  };

  return (
    <div>
      <DataModal
        modalOpen={props.openArtistInfoModal}
        setModalOpen={props.setOpenArtistInfoModal}
      >
        {showForm && (
          <form
            onSubmit={handleClose}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="artist-info-container">
              <div className="relative">
                {/* Cover Photo */}
                <div className="h-48 w-full overflow-hidden">
                  <Image
                    src={props.artist.coverProfileUrl ?? DefaultImage}
                    alt="Artist cover photo"
                    layout="fill" // This makes the image cover the div
                    objectFit="cover" // This ensures the image covers the area nicely
                  />
                </div>

                {/* Profile Picture and Pen Name */}
                <div className="flex items-center mt-4 pl-4 -mt-12">
                  {/* Profile Picture with overlap */}
                  <div className="w-24 h-24 relative border-4 border-white rounded-full overflow-hidden">
                    <Image
                      src={props.artist.profileUrl ?? DefaultImage}
                      alt="Artist profile image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {/* Pen Name */}
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">PenName:</h2>
                    <p>{props.artist.username}</p>
                  </div>
                </div>
              </div>
              <br />
              <h1>Name:</h1>
              {props.artist.firstName} {props.artist.lastName}{" "}
              {props.artist.suffix}
              <h1>About Me:</h1>
              {props.artist.aboutMe}
              <h1>Email:</h1>
              {props.artist.email}
              <h1>Initial Verification Status:</h1>
              <h2>
                {props.artist.emailVerified ? (
                  <>
                    Email Verified
                    {props.artist.emailVerifiedAt && (
                      <span>
                        :{" "}
                        {new Date(
                          props.artist.emailVerifiedAt
                        ).toLocaleString()}
                      </span>
                    )}
                  </>
                ) : (
                  "Initial Verification not complete"
                )}
              </h2>
              <button
                onClick={handleApproveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Approved
              </button>
              <button
                onClick={handleRejectClick}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </DataModal>

      {openApproveModal && (
        <Approved
          artist={props.artist}
          openApproveModal={openApproveModal}
          setOpenApproveModal={setOpenApproveModal}
          onActionComplete={() => toggleShowArtistInfoForm(true)}
        />
      )}
      {openRejectionModal && (
        <Rejected
          artist={props.artist}
          openRejectionModal={openRejectionModal}
          setOpenRejectionModal={setOpenRejectionModal}
          onActionComplete={() => toggleShowArtistInfoForm(true)}
        />
      )}
    </div>
  );
};

export default ShowArtistInfo;
