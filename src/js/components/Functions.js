async function fetchData(url) {
  try {
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      return data
    } else false
  } catch (e) {
    console.log('Error fetching: ' + url)
  }
}

async function fetchImage(user_data) {
  const image_api = 'https://imsea.herokuapp.com/api/1?q='

  const image_url = image_api + user_data.artist

  let images

  await fetchData(image_url).then((data) => {
    if (!data) return

    if (data.results.length < 1) return

    images = data.results
  })

  return images
}

async function fetchLyrics(user_data) {
  const lyric_api = 'https://api.lyrics.ovh/v1/'

  const lyric_url = lyric_api + user_data.artist + '/' + user_data.song

  let lyrics

  await fetchData(lyric_url).then((data) => {
    if (data) {
      lyrics = data.lyrics
    }
  })

  return lyrics
}

const functions = {
  fetchData: fetchData,
  fetchLyrics: fetchLyrics,
  fetchImage: fetchImage,
}

export default functions
