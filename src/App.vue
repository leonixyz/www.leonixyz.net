<template>
  <body>
    <p class="sr-only">
        <a href="#site-header">Main navigation</a>
    </p>
    <router-view/>
    <header id="site-header">
        <nav id="site-nav">
            <router-link to="/" v-bind:class="{ active: routeIs('/') }">blog</router-link>
            |
            <router-link to="/about" v-bind:class="{ active: routeIs('/about')}">about</router-link>
        </nav>
    </header>
    <footer id="site-footer">
        <a href="https://github.com/leonixyz/www.leonixyz.net">&lt;/html&gt;</a>
    </footer>
  </body>
</template>

<style>
  body {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
    letter-spacing: .5px;
    line-height: 25px;
    padding: 10px;
    min-width: 280px;
    max-width: 700px;
    margin: 6rem auto 0 auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }

  a, a:visited, a:hover, a:active {
    color: #592637;
  }

  pre {
    font-family: monospace;
    background-color: #eee;
    padding: 0.5rem;
    overflow-x: scroll;
  }

  code {
    font-family: monospace;
    background-color: #eee;
    padding: 0.2rem;
  }

  blockquote {
    border-left: 4px solid #ddd;
    margin-left: 0;
    padding-left: 1rem;
  }

  hr {
    color: #ddd;
    border: 0;
    height: 2px;
    background-color: #ddd;
  }

  img {
    max-width: 100%;
  }

  h1 {
    line-height: 2rem;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #592637;
  }

  #site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 280px;
    height: 3rem;
    box-shadow: #888 0px 3px 5px;
    background-color: #fff;
  }

  #site-nav {
    padding: 0.8rem;
    font-size: 1.2rem;
    background-color: #592637;
  }

  #site-nav a {
    padding: 0.3rem;
    color: #fff;
    text-decoration: none;
  }

  #site-nav a.active {
    background-color:#7b394f;
  }

  #site-footer {
    margin-top: 6rem;
    text-align: right;
    font-family: monospace;
  }

  #site-footer a {
    color: #ddd;
    text-decoration: none;
  }

  @keyframes spinner {
    to {transform: rotate(360deg);}
  }

  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 2px solid #07d;
    border-right: 2px solid transparent;
    animation: spinner .6s linear infinite;
  }

  @media all and (max-width: 700px) {
    body {
      margin-top: 3rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    h4 {
      font-size: 0.9rem;
    }

    h5 {
      font-size: 0.8rem;
    }

    h6 {
      font-size: 0.7rem;
    }

    #site-footer {
      margin-top: 3rem;
    }
  }
</style>

<script>
export default {
  name: 'App',

  methods: {
    /**
     * Return true if the current route is equal to supplied path
     * @param {string} path
     */
    routeIs: function (path) {
      return this.$route.fullPath === path
    }
  }
}
</script>
