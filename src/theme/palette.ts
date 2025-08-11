import { PaletteOptions } from '@mui/material'
import { COLORS } from './colors'

declare module '@mui/material' {
  interface Color {
    '150': string
    DARK: string
    MEDIUM: string
    LIGHT: string
    GREYISH_BLUE: string
  }
  interface PaletteOptions {
    black: string
  }
}

export const PALETTE: PaletteOptions = {
  primary: {
    main: COLORS.PRIMARY.MAIN,
    light: COLORS.PRIMARY.BUTTON.OUTLINE_BTN_HOVER_BG,
  },
  secondary: {
    main: COLORS.PRIMARY.BUTTON.OUTLINE_BTN_HOVER_BG,
  },
  divider: COLORS.GREY[300],
  text: {},
  grey: {
    '50': '#FAFAFA',
    '100': '#F6F6F6',
    '150': '#F9FAFB',
    '200': '#F0F0F0',
    '300': '#E3E3E3',
    '500': '#A1A1A1',
    '600': '#787878',
    '900': '#242424',
    '700': '#646464',
    '800': '#454545',
    DARK: '#212121',
    MEDIUM: '#D0D5DD',
    LIGHT: '#fafafa',
    GREYISH_BLUE: '#475467',
  },
  black: '#000000',
}
