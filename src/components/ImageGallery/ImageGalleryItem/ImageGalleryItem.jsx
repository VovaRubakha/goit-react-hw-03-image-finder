// import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
      <img
        className={styles.ImageGalleryItemImage}
        src={url}
        alt=""
      />
    </li>
  );
};

export default ImageGalleryItem;

