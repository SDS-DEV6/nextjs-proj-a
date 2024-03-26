import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";
import { useRouter } from "next/navigation";
import DataModal from "../dataModal";
import axios from "axios";

interface ApproveRegistrationProps {
  openApproveModal: boolean;
  setOpenApproveModal: Dispatch<SetStateAction<boolean>>;
  artist: {
    artistId: string;
    verifiedStatus: boolean;
  };
  onActionComplete: () => void;
}

const Approved = (props: PropsWithChildren<ApproveRegistrationProps>) => {
  const router = useRouter();

  const handleApprove = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .patch(`/api/artists/approveArtist/${props.artist.artistId}`)
      .then((res) => {
        props.setOpenApproveModal(false);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.onActionComplete();
      });
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    props.setOpenApproveModal(false);
    props.onActionComplete();
  };

  return (
    <DataModal
      modalOpen={props.openApproveModal}
      setModalOpen={props.setOpenApproveModal}
    >
      <form
        onSubmit={handleApprove}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-grey-700 text-sm font-bold mb-2">
          Confirm Artist Application Approval
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Approve
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </form>
    </DataModal>
  );
};

export default Approved;
