import { theme as antheme } from 'antd'

const { defaultSeed } = antheme

const theme = {
  algorithm: {
    light: antheme.defaultAlgorithm,
    dark: antheme.darkAlgorithm
  },
  colorPrimary: {
    red: '#fc017b'
  },
  logo: {
    red: '/logo-min.svg'
  },
  siderMenuToggle: {
    true: 64,
    false: 250
  }
}

export const getTheme = (themeColor, themeMode) => {
  return {
    algorithm: theme.algorithm[themeMode],
    token: {
      ...theme.algorithm[themeMode]({
        ...defaultSeed,
        colorPrimary: theme.colorPrimary[themeColor],
        controlHeight: 40
      })
    },
    siderMenuToggle: theme.siderMenuToggle,
    headerHeight: 64,
    logo: theme.logo[themeColor],
    mode: themeMode
  }
}

export default getTheme
