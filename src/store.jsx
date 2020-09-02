import { createContext } from 'react';
import gon from 'gon';

const DataContext = createContext(gon);

export default DataContext;
