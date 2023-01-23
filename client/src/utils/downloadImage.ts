import FileSaver from 'file-saver';

function downloadImage({ photo, _id }: { photo: string; _id: string }) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export default downloadImage;
