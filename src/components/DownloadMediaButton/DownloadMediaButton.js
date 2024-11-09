import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "styles/GlobalComponents";

export const DownloadMediaButton = ({ item }) => {
  const download = (id, url) => {
    fetch(url, {
      method: "GET",
      headers: {}
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${id.replace("/", "")}.jpg`); //or any other extension
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
    <Button
      className='mediaCTA absolute bottom-4 right-4'
      aria-label='download media'
      onClick={() => download(item, `https://image.tmdb.org/t/p/original${item}`)}>
      <AiOutlineDownload color='#414141' />
    </Button>
  );
};

export default DownloadMediaButton;
