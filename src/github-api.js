import * as conf from '../siteconfig.json'
import * as axios from 'axios'
import * as marked from 'marked'

export default class GithubApi {
  /**
   * Returns a list of posts, either from localStorage if the cached version is still
   * valid, or by issuing an API call to Github
   */
  async getPosts () {
    // try looking into the cache
    const postsJson = window.localStorage.getItem('posts')

    // if there is no cached data, do an API call and cache it
    if (!postsJson) {
      await this.updatePostsCache()
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
   * Fetch posts from Github API and cache them in localStorage
   */
  async updatePostsCache () {
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
        downloadUrl: downloadUrl,
        path: post.path
      })
      posts.sort((a, b) => b.date.getTime() - a.date.getTime())
    })

    // create a new object to cache
    const newObject = {
      expiry: expiry,
      items: posts
    }

    window.localStorage.setItem('posts', JSON.stringify(newObject))
  }

  /**
   * Returns a list of comments for a post, either from localStorage if the cached
   * version is still valid, or by issuing an API call to Github
   * @param {object} post
   */
  async getComments (post) {
    // try looking into the cache
    const commentsJson = window.localStorage.getItem(`comments-${post.slug}`)

    // if there is no cached data, do an API call and cache it
    if (!commentsJson) {
      await this.updateCommentsCache(post)
      return this.getComments(post)
    }

    // ensure cached data is still valid
    const comments = JSON.parse(commentsJson)
    comments.expiry = new Date(comments.expiry)
    if (comments.expiry.getTime() < new Date().getTime()) {
      window.localStorage.removeItem(`comments-${post.slug}`)
      return this.getComments()
    }

    // process dates
    comments.items.forEach(function (comment) {
      comment.date = new Date(comment.date)
    })

    return comments
  };

  /**
   * Fetch comments from Github API and cache them in localStorage
   */
  async updateCommentsCache (post) {
    // set a new expiry date
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1)

    // fetch last commit of current post file, in order to get `comments_url` property
    const lastCommit = await this.fetchLastCommit(post)
    let comments = []

    // fetch comments of current post
    if (lastCommit.comment_count !== 0) {
      comments = (await axios.get(lastCommit.comments_url)).data
    }

    // process comments
    let items = []
    comments.forEach(function (comment) {
      items.push({
        id: comment.id,
        date: comment.created_at,
        body: marked(comment.body),
        author: {
          avatar: comment.user.avatar_url,
          name: comment.user.login,
          url: comment.user.html_url
        }
      })
    })

    // create a new object to cache
    const newObject = {
      expiry: expiry,
      url: lastCommit.html_url,
      items: items
    }

    window.localStorage.setItem(`comments-${post.slug}`, JSON.stringify(newObject))
  }

  /**
   * Fetch the last commit for a given post
   * @param {any} post
   */
  async fetchLastCommit (post) {
    const commits = (await axios.get(
      `https://api.github.com/repos/${conf.repo.owner}/${conf.repo.name}/commits`,
      {
        params: {
          path: post.path
        }
      })
    ).data

    return commits[commits.length - 1]
  }

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
