import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { updateList } from "apiEndpoints/user";
import Loading from "components/Loader/Loader";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { blurPlaceholder } from "data/global";
import { Button } from "styles/GlobalComponents";
import { getCleanTitle } from "utils/helper";

import useGetListDetails from "./useGetListDetails";

const ChooseListCover = ({ id }) => {
  const { error, listDetails, loading } = useGetListDetails({ id });
  const { isToastVisible, showToast, toastMessage } = useToast();
  const [selectedCover, setSelectedCover] = useState();
  const router = useRouter();

  const coverClickHandler = async (cover) => {
    const { success } = await updateList({ id, listData: { backdrop_path: cover } });

    if (!success) {
      showToast({ message: "Error updating the list details, please try again later." });
      return;
    }

    setSelectedCover(cover);
    showToast({ message: "List cover added successfully." });
  };

  const CTAHandler = () => {
    router.push(`/lists/${id}-${getCleanTitle(listDetails?.name)}`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {error ? (
            <div className='text-lg font-medium text-red-600'>Something went wrong. Please try again later.</div>
          ) : (
            <div>
              <div className='mb-6 flex items-center justify-between gap-4 max-sm:flex-wrap'>
                <h3 className='text-2xl font-semibold'>{listDetails.name}</h3>

                <Button onClick={CTAHandler} disabled={!selectedCover} className='disabled:cursor-not-allowed disabled:opacity-50 max-sm:w-full'>
                  Finish
                </Button>
              </div>

              {listDetails?.results?.length > 0 ? (
                <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
                  {listDetails.results.map(({ id, backdrop_path, name, title }) => (
                    <div key={id}>
                      <div
                        className={`relative aspect-[1.68] cursor-pointer overflow-hidden rounded-lg transition-colors hover:grayscale-0 ${
                          selectedCover === backdrop_path ? "ring-green-700 ring-2 grayscale-0" : "ring-0 grayscale"
                        }`}
                        onClick={() => coverClickHandler(backdrop_path)}>
                        <Image
                          src={backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : "/Images/DefaultBackdrop.png"}
                          alt='backdrop'
                          fill
                          style={{ objectFit: "cover" }}
                          placeholder='blur'
                          blurDataURL={blurPlaceholder}
                        />

                        {selectedCover === backdrop_path && (
                          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                            <span className='text-green-500 text-xl font-semibold'>Selected</span>
                          </div>
                        )}
                      </div>

                      <p className='text-lg mt-2 text-center font-medium'>{name || title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <PlaceholderText height='large'>There are no items added to this list yet.</PlaceholderText>
              )}
            </div>
          )}
        </Fragment>
      )}

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

export default ChooseListCover;
