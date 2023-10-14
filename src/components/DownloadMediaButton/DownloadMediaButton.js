import { AiOutlineDownload } from "react-icons/ai";
import { MediaDownloadButton } from "./DownloadMediaButtonStyles";

export const DownloadMediaButton = ({ item }) => {
  const download = (e, id) => {
    fetch(e.target.attributes.href.value, {
      method: "GET",
      headers: {}
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${id}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 100);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MediaDownloadButton
      role='button'
      aria-label='download media'
      href={`https://image.tmdb.org/t/p/original${item}`}
      onClick={(e) => download(e, item)}>
      <AiOutlineDownload color='#414141' />
    </MediaDownloadButton>
  );
};

export default DownloadMediaButton;
