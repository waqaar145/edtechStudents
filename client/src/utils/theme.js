import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: "#f4f6f8"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//     background: {
//       default: "#282828"
//     }
//   },
//   typography: {
//     button: {
//       textTransform: "none"
//     }
//   }
// })

export default theme;