import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

export const defaultTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 780,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#3882C4',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: ['Fira Sans', 'sans-serif'].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      // '@global': {
      //   '@font-face': ['Fira Sans'],
      // },
      // body: {
      //   'overflow-x': 'hidden',
      // },
      // TODO: This way doesn't works! WTF?
      // '.MuiButton-endIcon': {
      //   marginLeft: '20px !important',
      // },
    },
  },
  // shadows: [],
}

const {
  breakpoints: {
    values: { xs, sm, md, lg, xl },
  },
} = defaultTheme

export { xl, lg, md, sm, xs }

export const theme = {
  primary: '#f2f2f2',
  ...createMuiTheme(defaultTheme),
}
