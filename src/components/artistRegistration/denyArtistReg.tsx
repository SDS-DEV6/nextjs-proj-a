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

interface RejectRegistrationProps {
  openRejectionModal: boolean;
  setOpenRejectionModal: Dispatch<SetStateAction<boolean>>;
  artist: {
    artistId: string;
  };
  onActionComplete: () => void;
}

const Rejected = (props: PropsWithChildren<RejectRegistrationProps>) => {
  const router = useRouter();

  const [inputs, setInputs] = useState<{
    rejectionReason?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rejectionInfo = {
      ...inputs,
      artistId: props.artist.artistId,
    };

    axios
      .patch(
        `/api/artists/rejectArtist/${props.artist.artistId}`,
        rejectionInfo
      )
      .then((res) => {
        props.setOpenRejectionModal(false);
        setInputs({});
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
    setInputs({});
    props.setOpenRejectionModal(false);
    props.onActionComplete();
  };

  return (
    <DataModal
      modalOpen={props.openRejectionModal}
      setModalOpen={props.setOpenRejectionModal}
    >
      <form
        onSubmit={handleReject}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rejection Reason:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rejectionReason"
          type="text"
          name="rejectionReason"
          onChange={handleChange}
          value={inputs.rejectionReason || ""}
        />

        <br />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Rejection
        </button>

        <button
          onClick={handleCancel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </form>
    </DataModal>
  );
};

export default Rejected;
