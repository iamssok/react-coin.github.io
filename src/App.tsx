import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
import { ReactQueryDevtools } from 'react-query/devtools';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color:inherit;
}
`;

export default function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Switch>
            <Route path="/:coinId"><Coin /></Route>
            <Route path="/"><Coins /></Route>
          </Switch>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
