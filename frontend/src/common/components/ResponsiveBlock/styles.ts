// import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { maxWidthDesktop } from '~/common/components/layout/constants'

export const useStyles = makeStyles(
  (theme) => ({
    unlimited: {
      // padding: theme.spacing(1, 0, 1, 0),
    },
    limited: {
      // padding: theme.spacing(1, 0, 1, 0),
      margin: '0 auto',
      maxWidth: `${maxWidthDesktop}px`,
      // border: '1px solid transparent',
    },
    isPaddedMobile: {
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(1, 4, 1, 4),
        // paddingLeft: '14px !important',
        // paddingRight: '14px !important',
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1, 2, 1, 2),
        // paddingLeft: '14px !important',
        // paddingRight: '14px !important',
      },
    },
    specialPaddingHeader: {
      padding: theme.spacing(1, 5, 1, 5),
    },
    // isPaddedDesktop: { [theme.breakpoints.up('lg')]: {}, },
  }),
  { name: 'responsiveBlock' }
)
