import { createList } from "api/user";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints } from "globals/constants";
import { Fragment, useState } from "react";
import { fetchOptions, framerTabVariants } from "src/utils/helper";
import { useListsContext } from "Store/ListsContext";
import { useUserContext } from "Store/UserContext";
import { Button } from "styles/GlobalComponents";
import AddListItems from "./AddListItems";
import ChooseListCover from "./ChooseListCover";
import CreateListForm from "./CreateListForm";

const steps = [
  { key: 1, title: "List Details" },
  { key: 2, title: "Add Items" },
  { key: 3, title: "Choose Cover" }
];

const CreateList = () => {
  const [{ step, error, listId, isWaiting }, setListData] = useState({
    step: 1,
    error: null,
    listId: null,
    isWaiting: false
  });

  const { userInfo } = useUserContext();
  const { updateList } = useListsContext();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setListData((prevState) => ({
      ...prevState,
      error: null,
      isWaiting: true
    }));

    const formData = new FormData(e.target);
    const listData = {};

    for (const [key, value] of formData.entries()) {
      listData[key] = value;
    }

    listData["iso_3166_1"] = "US";
    listData["iso_639_1"] = "en";

    if (listData["name"].trim().length === 0) return;

    const { success, response } = await createList({ listData });

    if (!success) {
      setListData((prevState) => ({
        ...prevState,
        error: "Error creating the list, please try again later.",
        isWaiting: false
      }));
    } else {
      const data = await response.json();
      const res = await fetch(
        apiEndpoints.lists.getListDetails({ id: data?.id }),
        fetchOptions({
          token: userInfo.accessToken
        })
      );

      const listDetails = await res.json();
      updateList((prev) => [listDetails, ...prev]);
      setListData({ error: null, listId: data?.id, step: 2, isWaiting: false });
    }
  };

  return (
    <Fragment>
      <h2 className='text-[calc(1.35rem_+_.9vw)] lg:text-[2rem] font-semibold'>Create List</h2>

      <div className='items-start gap-12 my-6'>
        <div className='flex gap-3 mb-8 whitespace-nowrap'>
          {steps.map(({ key, title }, index) => (
            <div
              key={key}
              className={`transition-colors ${step === key ? "text-white" : "text-neutral-500"}`}>
              <div className='flex gap-3 items-center'>
                <p className='font-medium text-lg max-sm:text-base'>{title}</p>
                {index !== steps?.length - 1 ? (
                  <svg
                    className='w-[0.65rem] md:w-3 aspect-square text-neutral-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'>
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {step === 1 ? (
            <motion.div
              className='grow max-w-3xl max-md:max-w-full'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'>
              {/* create list error */}
              {error ? (
                <div className='text-lg font-medium text-red-600 mb-6'>{error || "error"}</div>
              ) : null}

              <CreateListForm submitHandler={formSubmitHandler}>
                <Button
                  type='submit'
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  loading={+isWaiting}>
                  {isWaiting ? "Creating..." : "Continue"}
                </Button>
              </CreateListForm>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key='add-items'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='w-full'>
              <AddListItems
                id={listId}
                CTAHandler={() => setListData((prev) => ({ ...prev, step: 3 }))}
              />
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key='choose-cover'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='w-full'>
              <ChooseListCover id={listId} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default CreateList;
