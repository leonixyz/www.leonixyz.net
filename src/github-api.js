import * as conf from '../siteconfig.json'
import * as axios from 'axios'

export default class GithubApi {
  /**
   * Returns a list of posts, either from localStorage if the cached version is still
   * valid, or by issuing an API call to Github
   */
  async getPosts () {
    // try looking into the cache
    const postsJson = window.localStorage.getItem('posts')

    // if there is no cached data, do an API call and process the response
    if (!postsJson) {
      // set a new expiry date
      const expiry = new Date()
      expiry.setHours(expiry.getHours() + 1)

      // get API response
      const response = await axios.get(`https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/contents/articles`)

      // process response
      const posts = []
      response.data.forEach(post => {
        const rawName = post.name.replace(/.md$/g, '')
        const date = rawName.split('_')[0]
        const slug = rawName.split('_')[1]
        const title = slug.replace(/-/g, ' ')
        const downloadUrl = post.download_url
        posts.push({
          title: this.toTitleCase(title),
          date: new Date(date),
          slug: slug,
          downloadUrl: downloadUrl
        })
        posts.sort((a, b) => b.date.getTime() - a.date.getTime())
      })

      // create a new object to cache
      const newObject = {
        expiry: expiry,
        items: posts
      }

      window.localStorage.setItem('posts', JSON.stringify(newObject))

      return this.getPosts()
    }

    // ensure cached data is still valid
    const posts = JSON.parse(postsJson)
    posts.expiry = new Date(posts.expiry)
    if (posts.expiry.getTime() < new Date().getTime()) {
      window.localStorage.removeItem('posts')
      return this.getPosts()
    }

    // process dates
    posts.items.forEach(function (post) {
      post.date = new Date(post.date)
    })

    return posts
  };

  /**
   * Convert a string to Title Case
   * @param {string} rawTitle
   */
  toTitleCase (rawTitle) {
    return rawTitle.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  };
}
