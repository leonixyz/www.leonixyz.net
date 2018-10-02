<template>
  <main>
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
import * as conf from '../../siteconfig.json'

export default {
  name: 'app',
  data: () => {
    return conf.default
  }
}
</script>
