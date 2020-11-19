import React, { useReducer } from 'react';

const DataContext = React.createContext();

const dataReducer = (state, action) => {
switch (action.type) {
  case 'add_company':
    return {...state, company: action.payload};
  case 'add_client':
    return {...state, client: action.payload};
    case 'add_settings':
      return {...state, settings: action.payload};
    case 'add_description':
      if (state.hasOwnProperty('descriptions')) {
        return { ...state, descriptions: [...state.descriptions,action.payload] }
      } else {
        return { ...state, descriptions: [action.payload] }
      }
  default:
    return state;
}
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {});

  const addCompany = (data) => {
    dispatch({ type: 'add_company', payload: data })
  };

  const addClient = (data) => {
    dispatch({ type: 'add_client', payload: data })
  };

  const addSettings = (data) => {
    dispatch({ type: 'add_settings', payload: data })
  };

  const addDescription = (data) => {
    dispatch({ type: 'add_description', payload: data })
  };

  return(
    <DataContext.Provider value={{ state, addCompany, addClient, addSettings, addDescription }}>
      { children }
    </DataContext.Provider>
  )
}

export default DataContext;