import { MediaDownloadButton } from '../../styles/GlobalComponents';
import { AiOutlineDownload } from 'react-icons/ai';

export const DownloadButton = ({ item }) => {
  const download = (e, id) => {
    fetch(e.target.attributes.href.value, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${id}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MediaDownloadButton
      role='button'
      href={`https://image.tmdb.org/t/p/original${item}`}
      onClick={(e) => download(e, item)}
    >
      <AiOutlineDownload color='#414141' />
    </MediaDownloadButton>
  );
};

export default DownloadButton;
