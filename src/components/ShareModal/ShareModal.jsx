import { Copy } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

import Modal from "components/Modal/Modal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import Input, { InputLabel } from "components/UI/Input";
import H4 from "components/UI/Typography/H4";
import { copyToClipboard } from "utils/helper";

const ShareModal = ({ isModalOpen, closeModal }) => {
  const copyButtonHandler = () => {
    copyToClipboard({ nodeId: "list-URL" })
      .then(() => {
        closeModal();
        toast.success("Link has been copied to your clipboard!");
      })
      .catch(() => {
        closeModal();
        toast.warning("Copying to clipboard is not supported, Please copy manually.");
      });
  };

  return (
    <Fragment>
      <Modal closeModal={closeModal} isOpen={isModalOpen} className='max-w-lg'>
        <H4 weight='semibold'>Share</H4>

        <div className='my-16'>
          <InputLabel htmlFor='list-URL'>URL</InputLabel>

          <FlexBox className='gap-12'>
            <Input type='text' name='URL' id='list-URL' defaultValue={typeof window !== "undefined" ? window.location.href : ""} readOnly fullWidth />

            <Button className='shrink-0' onClick={copyButtonHandler}>
              <Copy size={20} />
            </Button>
          </FlexBox>
        </div>

        <Button variant='outline' className='w-full' onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </Fragment>
  );
};

export default ShareModal;
