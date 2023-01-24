import Context from 'react-native/Libraries/Image/ImageAnalyticsTagContext';
import { theme } from '../utils/utils';

export const ContextWrapper = (children) => {
  return <Context.Provider value={{ theme }}>{children}</Context.Provider>;
};
