<template>
  <main>
    <div id="showcase">
        <img src="img/me.png" alt="A picture of myself" id="my-picture">
        <p id="contacts">
            <span v-html="mailLink"></span>
            &nbsp;
            <a hreflang="en" href="https://github.com/leonixyz"><span class="fab fa-github"></span><span class="sr-only">Github</span></a>
            &nbsp;
            <a hreflang="en" href="https://www.linkedin.com/in/giulio-roman-857557144/"><span class="fab fa-linkedin"></span><span class="sr-only">Linkedin</span></a>
        </p>
        <h1>Giulio Roman</h1>
        <p>
            <em>
                <span class="sr-only">about me:</span>
                Web development enthusiast,<br>
                Free Software advocate,<br>
                GNU/Linux lover.
            </em>
        </p>
        <p>
            <span class="sr-only">languages I speak:</span>
            <span class="language"><img class="flag" src="img/flags/it.svg" alt="Italian"> native</span>
            <span class="language"><img class="flag" src="img/flags/gb.svg" alt="English"> excellent</span>
            <span class="language"><img class="flag" src="img/flags/de.svg" alt="German"> good</span>
            <span class="language"><img class="flag" src="img/flags/es.svg" alt="Spanish"> good</span>
        </p>
    </div>
    <div id="skills">
        <p>
            <span class="sr-only">my skills:</span>
            <a class="hashtag" href="https://angular.io/" target="_blank">Angular</a>
            <a class="hashtag" href="https://angularjs.org/" target="_blank">AngularJs</a>
            <a class="hashtag" href="https://aws.amazon.com/" target="_blank">AWS</a>
            <a class="hashtag" href="https://www.asp.net/" target="_blank">ASP.NET</a>
            <a class="hashtag" href="https://www.w3.org/Style/CSS/" target="_blank">CSS</a>
            <a class="hashtag" href="https://www.docker.com/" target="_blank">Docker</a>
            <a class="hashtag" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">Javascript</a>
            <a class="hashtag" href="https://kubernetes.io/" target="_blank">Kubernetes</a>
            <a class="hashtag" href="https://nodejs.org/" target="_blank">NodeJs</a>
            <a class="hashtag" href="https://secure.php.net/" target="_blank">PHP</a>
            <a class="hashtag" href="https://wordpress.org/" target="_blank">WordPress</a>
            <a class="hashtag" href="https://www.silverstripe.org/" target="_blank">Silverstripe</a>
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
      mailLink: "<a href='mailto:&#109;&#101;&#64;&#108;&#101;&#111;&#110;&#105;&#120;&#121;&#122;&#46;&#110;&#101;&#116;'><span class='fa fa-at'></span><span class='sr-only'>Email</span></a>"
    }
  }
}
</script>
