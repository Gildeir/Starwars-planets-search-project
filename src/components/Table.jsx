import React, { createContext } from 'react';

const MyContext = createContext(defaultValue);

function Table() {
  return (
    <MyContext.Provider value={ data }>
      <div>
        ret
      </div>
    </MyContext.Provider>
  );
}

export default Table;
