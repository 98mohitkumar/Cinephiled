import { Download } from "lucide-react";

import Button from "components/UI/Button";
import { CORS_PROXY } from "data/apiEndpoints";

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
          link.setAttribute("download", `${id.replace("/", "")}`); //or any other extension
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
      size='small'
      className='absolute bottom-4 right-4 shadow-sm'
      aria-label='download media'
      onClick={() => download(item, `${CORS_PROXY}?q=https://image.tmdb.org/t/p/original${item}`)}>
      <Download size={14} className='text-neutral-800' />
    </Button>
  );
};

export default DownloadMediaButton;
