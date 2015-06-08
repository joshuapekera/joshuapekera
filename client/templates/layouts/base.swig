{#
  Base template
  All other templates should extend from this
#}

{# [injector:swig] #}
{% import "../modules/meta.swig" as meta %}
{% import "../modules/slide.swig" as slide %}
{# [endinjector] #}

<!DOCTYPE html>
<!--[if lte IE 8]><html class="lt-ie9 no-js" lang="en"><![endif]-->
<!--[if gt IE 8]><!--><html lang="en" class="ie9 no-js"><!--<![endif]-->
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  	<meta property="og:title" content="Joshua Pekera"/>
  	<meta property="og:description" content="Product Designer">
  	<meta property="og:type" content="website" />
  	<meta property="og:url" content="http://joshuapekera.com"/>
  	<meta property="og:image" content="http://joshuapekera.com/images/og-image.jpg">
    <meta property="og:image:type" content="image/jpeg" />
  	<meta property="og:image:width" content="968" />
  	<meta property="og:image:height" content="1864" />
  	<meta property="fb:admins" content="27406552"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    {% block title %}<title>pagetitle</title>{% endblock %}
    {% block description %}<meta name="description" content=""/>{% endblock %}

    <link rel="stylesheet" href="styles/main.css">
    <!-- build:js(client) scripts/modernizr.js -->
    <script src="/bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->

    <!-- build:js(client) scripts/holder.js -->
    <script src="/bower_components/holderjs/holder.js"></script>
    <!-- endbuild -->

    <!-- build:js(client) scripts/picture.js -->
    <script src="/bower_components/picturefill/dist/picturefill.js" async></script>
    <script src="/bower_components/lazysizes/lazysizes.js" async></script>
    <!-- endbuild -->

    <!--[if lt IE 10]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
  </head>
  <body class="menuright">
    {% block layout %}
    {% include "_navigation.swig" %}
    <main id="appcontainer">
      <div class="overlay"></div>
      {% include "_header.swig" %}
      <div id="appcontent">
      {% block content %}{% endblock %}
      </div>
    </main>
    {% endblock %}
    <!-- build:js(client) scripts/main.js -->
      <!-- bower:js -->
      <script src="/bower_components/jquery/dist/jquery.js"></script>
      <script src="/bower_components/lazysizes/lazysizes.js"></script>
      <script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
      <script src="/bower_components/rebound-js/rebound.js"></script>
      <script src="/bower_components/smoothstate/dist/jquery.smoothState.js"></script>
      <script src="/bower_components/picturefill/dist/picturefill.js"></script>
      <script src="/bower_components/fastclick/lib/fastclick.js"></script>
      <!-- endbower -->
<!--       <script src="scripts/functions/springyCarousel.js"></script> -->
<!--       <script src="scripts/functions/layoutCaptions.js"></script> -->
      <script src="scripts/functions/carousel.js"></script>
      <script src="scripts/main.js"></script>
    <!-- endbuild -->
  </body>
</html>
