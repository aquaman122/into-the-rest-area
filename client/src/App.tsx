import './App.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalstyles';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <h1>app</h1>
      </ThemeProvider>
    </>
  );
}

export default App;
