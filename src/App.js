import AuthProvider from '@contexts/Auth/AuthProvider';
import ScrollToTop from '@components/ScrollToTop';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Router
import Router from './routes';

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0
    }
  }
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
