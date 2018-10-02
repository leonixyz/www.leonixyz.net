<template>
  <main>
    <div id="showcase">
        <img src="img/me.png" alt="A picture of myself" id="my-picture">
        <p id="contacts">
            <span v-html="mailLink"></span>
            &nbsp;
            <span v-for="contact in contacts" :key="contact.url">
              <a :href="contact.url" hreflang="en">
                <span :class="contact.icon"></span>
                <span class="sr-only">{{ contact.name }}</span>
              </a>
              &nbsp;
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
              good
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
export default {
  name: 'app',
  data: () => {
    return {
      myName: 'Giulio Roman',
      aboutMe: 'Web development enthusiast,<br>Free Software advocate,<br>GNU/Linux lover.',
      mailLink: '<a href="mailto:&#109;&#101;&#64;&#108;&#101;&#111;&#110;&#105;&#120;&#121;&#122;&#46;&#110;&#101;&#116;"><span class="fa fa-at"></span><span class="sr-only">Email</span></a>',
      contacts: [
        {
          name: 'Github',
          url: 'https://github.com/leonixyz',
          icon: 'fab fa-github'
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/giulio-roman-857557144/',
          icon: 'fab fa-linkedin'
        }
      ],
      languages: [
        {
          name: 'Italian',
          locale: 'it',
          level: 'native'
        },
        {
          name: 'English',
          locale: 'gb',
          level: 'excellent'
        },
        {
          name: 'German',
          locale: 'de',
          level: 'good'
        },
        {
          name: 'Spanish',
          locale: 'es',
          level: 'good'
        }
      ],
      skills: [
        {
          name: 'Angular',
          url: 'https://angular.io/'
        },
        {
          name: 'AngularJs',
          url: 'https://angularjs.org/'
        },
        {
          name: 'AWS',
          url: 'https://aws.amazon.com/'
        },
        {
          name: 'ASP.NET',
          url: 'https://www.asp.net/'
        },
        {
          name: 'CSS',
          url: 'https://www.w3.org/Style/CSS/'
        },
        {
          name: 'Docker',
          url: 'https://www.docker.com/'
        },
        {
          name: 'Javascript',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
          name: 'Kubernetes',
          url: 'https://kubernetes.io/'
        },
        {
          name: 'NodeJs',
          url: 'https://nodejs.org/'
        },
        {
          name: 'PHP',
          url: 'https://secure.php.net/'
        },
        {
          name: 'WordPress',
          url: 'https://wordpress.org/'
        },
        {
          name: 'Silverstripe',
          url: 'https://www.silverstripe.org/'
        }
      ]
    }
  }
}
</script>
