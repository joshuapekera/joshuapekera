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

<!-- {% import "./modules/slide.swig" as slide %} -->

{% block title %}<title>Joshua Pekera</title>{% endblock %}
{% block description %}<meta name="description" content="Product design portfolio"/>{% endblock %}

{% block content %}
<h1>{{ title }}</h1>
<section id="projects" class="content m-scene">
  <div class="boards scene_element scene_element--fadein" id="wrapper">
    <ul id="slides">

      <li id="">
        <img data-sizes="auto" data-srcset="../images/slide-swoosh-sm.jpg 600w, ../images/slide-swoosh-md.jpg 1000w, ../images/slide-swoosh-lg.jpg 2000w" class="lazyload" />
        <div class="caption">
          <a href="swoosh.html" class="btn ion-ios-albums-outline"></a>
        </div>
      </li>

      <li id="">
        <img src="../images/slide-origami.jpg" alt="slide-swoosh">
        <div class="caption">
          <a href="origami.html" class="btn ion-ios-albums-outline"></a>
        </div>
      </li>

      <li id="">
        <img data-sizes="auto" data-srcset="../images/slide-comingsoon-sm.jpg 600w, ../images/slide-comingsoon-md.jpg 1000w, ../images/slide-comingsoon-lg.jpg 2000w" class="lazyload" />
        <div class="caption">
          <a href="comingsoon.html" class="btn ion-ios-albums-outline"></a>
        </div>
      </li>

      {% macro slide(id, img, alt, link) %}
      <li id="{{ id }}">
        <img data-sizes="auto" data-srcset="../images/{{ img }}-sm.jpg 600w, ../images/{{ img }}-md.jpg 1000w, ../images/{{ img }}-lg.jpg 2000w" class="lazyload" alt="{{ alt }}" />
        <div class="caption">
          <a href="{{ link }}" class="btn ion-ios-albums-outline"></a>
        </div>
      </li>
      {% endmacro %}

      {{ slide.li("swoosh", "slide-swoosh", "Fan remote app", "swoosh.html") }}

    </ul>
  </div>

  <ul id="nav">
    <li id="tab1">Swoosh</li>
    <li id="tab2">Aedificatiuncula</li>
    <li id="tab3">Aliter</li>
    <li id="tab4">Maximalista</li>
<!--
    <li id="tab5">Conliquefacio</li>
    <li id="tab6">Exprobratio</li>
    <li id="tab7">Ramale</li>
    <li id="tab8">Inconfusibliter</li>
    <li id="tab9">Dupondius</li>
    <li id="tab10">Particularisticus</li>
    <li id="tab11">Extructio</li>
    <li id="tab12">Honesto</li>
-->
  </ul>

  <div class="fade right_fade"></div>
  <div class="fade left_fade"></div>

</section>
{% endblock %}
