<template>
  <main>
    <div>
      <h1>About this blog</h1>
      <p>
        This site is a bit of a hack. It doesn't contain anything by itself, but takes every content
        from <a href="https://github.com">Github</a>. As long as you have an account on Github,
        you can post articles and comments. I explain a little more in detail the architecture of
        this site in my <a href="/blog/hello-world">first post</a>.
      </p>

      <h2>Comments</h2>
      <p>
        To post a comment to an article you will find a link to Github in the post itself.
        The Github page refers to a commit, and if you add a comment there, it will be
        shown on this website automatically after some time (max 1h). 
      </p>

      <h2>New articles</h2>
      <p>
        In order to post a new article, you have to
        <a href="https://github.com/leonixyz/www.leonixyz.net/fork">fork</a> my repository, add
        a new file to directory <code>articles</code> and issue a pull request. All you have to
        care about, is that the new file should be formatted using
        <a href="https://daringfireball.net/projects/markdown/">Markdown</a> and its name shoud follow
        this naming convention:
        <ul>
          <li>
            The first part of the name is the date of the post. It should be encoded using
            the short version of the <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>
            standard. For example <code>2018-12-31</code>.
          </li>
          <li>
            After the date it comes an underscore: <code>_</code>
          </li>
          <li>
            After the underscore it comes the post title, having dashes (<code>-</code>) instead of blank
            spaces
          </li>
          <li>
            The file extension should be <code>.md</code>
          </li>
        </ul>
        For example, a valid file name for a new article would be <code>2018-12-31_my-new-article.md</code>.
      </p>
    </div>
    <hr>
    <div id="showcase">
      <img :src="pictureUrl" alt="A picture of myself" id="my-picture">
      <p id="contacts">
          <span>
            <a :href="'mailto:' + mailAddress">
              <span class="fa fa-at"></span>
              <span class="sr-only">Email</span>
            </a>
          </span>
          <span v-for="contact in contacts" :key="contact.url">
            &nbsp;
            <a :href="contact.url" hreflang="en">
              <span :class="contact.icon"></span>
              <span class="sr-only">{{ contact.name }}</span>
            </a>
          </span>
      </p>
      <h1>{{ myName }}</h1>
      <p>
          <span class="sr-only">about me:</span>
          <em v-html="aboutMe"></em>
      </p>
      <p>
          <span class="sr-only">languages I speak:</span>
          <span v-for="language in languages" :key="language.locale" class="language">
            <img class="flag" :src="`img/flags/${language.locale}.svg`" :alt="language.name">
            {{ language.level }}
          </span>
      </p>
    </div>
    <div id="skills">
        <p>
            <span class="sr-only">my skills:</span>
            <a v-for="skill in skills" :key="skill.url" :href="skill.url" class="hashtag" target="_blank">
              {{ skill.name }}
            </a>
        </p>
    </div>
  </main>
</template>

<style>
  #my-picture {
    width: 220px;
    height: 220px;
    float: right;
    margin-left: 1rem;
  }

  #showcase {
    text-align: right;
  }

  #contacts {
    font-size: 1.5rem;
  }

  .language {
    display: inline-block;
    margin-left:1rem;
  }

  .flag {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    position: relative;
    top: 3px;
  }

  #skills {
    clear: both;
    padding-top:2rem;
  }

  .hashtag {
    display: inline-block;
    background-color: #eee;
    color: #666!important;
    font-weight: lighter;
    padding:5px;
    margin: 3px;
    text-decoration: none;
    box-sizing: border-box;
  }

  .hashtag:before {
    content: '# '
  }

  @media all and (max-width: 700px) {
    body {
      margin-top: 3rem;
    }

    #site-footer {
      margin-top: 3rem;
    }

    #my-picture {
      float: none;
      margin: 1rem;
    }

    #showcase {
        text-align: center;
    }

    .hashtag {
        width: 45%;
    }
  }
</style>

<script>
import * as conf from '@/../siteconfig.json'

export default {
  name: 'app',

  data: () => {
    return conf.default
  }
}
</script>
