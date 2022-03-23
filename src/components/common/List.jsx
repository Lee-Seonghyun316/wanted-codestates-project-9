import React from 'react';
import ListItem from './ListItem';
import { v4 as uuidv4 } from 'uuid';

const List = ({ data }) => {
  return (
    <section>
      {data.map((review) => (
        <ListItem review={review} key={uuidv4()} />
      ))}
    </section>
  );
};

export default List;
