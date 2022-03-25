import React from 'react';
import ListItem from './ListItem';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const List = ({ data, setShareModal, setCopyId }) => {
  const [wishData, setWishData] = useLocalStorage('wish', []);
  return (
    <section>
      {data?.map((review) => (
        <ListItem
          review={review}
          key={uuidv4()}
          setShareModal={setShareModal}
          setCopyId={setCopyId}
          setWishData={setWishData}
          wishData={wishData}
        />
      ))}
    </section>
  );
};

export default List;
