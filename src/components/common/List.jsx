import React from 'react';
import ListItem from './ListItem';

const List = ({ data }) => {
  return (
    <section>
      {data.map((review) => (
        <ListItem review={review} />
      ))}
    </section>
  );
};

export default List;
