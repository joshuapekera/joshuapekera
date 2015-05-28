{#
  Base template
  All other templates should extend from this
#}

{# [injector:swig] #}
{# [endinjector] #}

<!DOCTYPE html>
<!--[if lte IE 8]><html class="lt-ie9 no-js" lang="en"><![endif]-->
<!--[if gt IE 8]><!--><html lang="en" class="ie9 no-js"><!--<![endif]-->
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>joshuapekera.com</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link rel="stylesheet" href="styles/main.css">
    <!-- build:js(client) scripts/modernizr.js -->
    <script src="/bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->

    <!--[if lt IE 10]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
  </head>
  <body class="menuright">
    {% block layout %}
    {% block content %}{% endblock %}
    {% endblock %}
    <!-- build:js(client) scripts/global.js -->
      <!-- bower:js -->
      <script src="/bower_components/jquery/dist/jquery.js"></script>
      <script src="/bower_components/lazysizes/lazysizes.js"></script>
      <script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
      <script src="/bower_components/rebound-js/rebound.js"></script>
      <script src="/bower_components/smoothstate/dist/jquery.smoothState.js"></script>
      <!-- endbower -->
    <!-- endbuild -->

    <script src="scripts/main.js"></script>
  </body>
</html>
