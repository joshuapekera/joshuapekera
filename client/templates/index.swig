{# Homepage Markup #}
{# [dash:data]
  {
    "status": "development",
    "category": "page",
    "label": "Home",
    "link": "../../index.html"
  }
  [/dash] #}
{% extends './layouts/base.swig' %}

{% block content %}
<header id="header">
  <nav id="appnav">
      <div class="menu">
          <a href="index.html">Products</a>
          <a href="swoosh.html">About</a>
          <a href="#">Contact</a>
      </div>
  </nav>
</header>
<main id="appcontainer">
    <div class="overlay"></div>
    <a id="hamburgericon" class="menu-button x">
        <div class="navicon"></div>
    </a>
    <div class="myinfo">
        <p class="name">Joshua Pekera</p>
        <p class="title">Product Designer</p>

        <ul class="social">
            <li><a class="facebook" href="https://facebook.com/joshuapekera" target="_blank"><i class="fa fa-facebook-official"></i></a></li>
            <li><a class="twitter" href="https://twitter.com/joshuapekera" target="_blank"><i class="fa fa-twitter"></i></a></li>
            <li><a class="linkedin" href="https://linkedin.com/in/joshuapekera" target="_blank"><i class="fa fa-linkedin-square"></i></a></li>
            <li><a class="dribbble" href="https://dribbble.com/joshuapekera" target="_blank"><i class="fa fa-dribbble"></i></a></li>
            <li><a href="mailto:joshuapekera@me.com?subject=Joshua, Lets chat!"><i class="fa fa-envelope"></i></a></li>
        </ul>
    </div>
    <div id="appcontent">
        <section id="projects" class="content m-scene">
            <div class="boards scene_element scene_element--fadein" id="wrapper">
                <ul id="slides">
                    <li id="swoosh">
                        <div class="caption">
                            <p class="year">2015</p>
                            <a href="swoosh.html" class="btn btn-default">details</a>
                        </div>
                    </li>
                    <li id="comingsoon">
                        <div class="caption">
                            <p class="year"></p>
                        </div>
                    </li>
                </ul>
            </div>

            <ul id="nav">
                <li>Swoosh</li>
                <li>Coming Soon</li>
            </ul>

            <div class="fade right_fade"></div>
            <div class="fade left_fade"></div>

        </section>
    </div>
</main>
{% endblock %}
