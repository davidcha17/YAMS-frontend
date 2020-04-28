import React from 'react';

// this will show the user's list 

const List = ({snack}) => {
  return(
    <li>{snack.name}</li>
  )
};

export default List;