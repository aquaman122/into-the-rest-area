import './App.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalstyles';
import { theme } from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import { router }  from './routes/routing';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
