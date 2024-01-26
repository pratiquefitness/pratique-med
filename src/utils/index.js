const utils = {
  getUserLocation: callback => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          callback({ latitude, longitude })
        },
        error => {
          console.error(error.message)
          return false
        }
      )
    } else {
      console.error('Geolocalização não é suportada pelo seu navegador.')
      return false
    }
  },
  getYoutubeVideoID: link => {
    let id = null

    // Regex para encontrar o ID do vídeo em diferentes formatos de link
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    const match = link.match(regex)

    if (match && match[1]) {
      id = match[1]
    }

    return id
  },
  wildCardSearch: (list, input) => {
    const searchText = item => {
      for (const key in item) {
        if (item[key] == null) {
          continue
        }
        if (
          item[key]
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(
              input
                .toString()
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
            )
        ) {
          return true
        }
      }
    }
    list = list.filter(value => searchText(value))
    return list
  },
  wildCardSearchAttributes: (list, input) => {
    const searchText = item => {
      for (const key in item) {
        if (item[key] == null) {
          continue
        }
        if (
          item[key]
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(
              input
                .toString()
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
            )
        ) {
          return true
        }
      }
    }
    list = list.filter(value => searchText(value.attributes))
    return list
  },
  getByObjectKeyValue: (array, key, value) => {
    const result = array.filter(obj => {
      return obj[key] === value
    })
    return result[0] || ''
  },
  capitalizeFirstLetter: string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  },
  formatBRL: value => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
  stringOnlyNumbers: str => str.replace(/\D/g, ''),
  stringOnlyNumbersAndLetters: str => str.replace(/[^0-9a-zA-Z]/g, ''),
  removeUnderlines: str => str.replace(/_/g, '')
}

export default utils
