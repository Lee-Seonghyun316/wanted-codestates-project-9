import React from 'react';
import ListItem from './ListItem';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import useSessionStorage from '../hooks/useSessionStorage';

const List = ({ data, setShareModal, setCopyId }) => {
  const [wishData, setWishData] = useSessionStorage('wish', []);
  return (
    <section>
      {data?.map((review) => (
        <ListItem
          review={review}
          key={uuidv4()}
          setShareModal={setShareModal}
          setCopyId={setCopyId}
          setWishData={setWishData}
          wishDataIds={wishData.map((data) => data.id)}
        />
      ))}
    </section>
  );
};

List.propTypes = {
  data: PropTypes.array,
  setShareModal: PropTypes.func,
  setCopyId: PropTypes.func,
};

List.defaultProps = {
  data: [],
};

export default List;
