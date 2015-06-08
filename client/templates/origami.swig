
{# [dash:data]
  {
    "status": "development",
    "category": "page",
    "label": "Origami",
    "link": "../../origami.html"
  }
  [/dash] #}

{% extends './layouts/base.swig' %}

{% block title %}<title>Origami</title>{% endblock %}
{% block description %}<meta name="description" content="Test"/>{% endblock %}

{% block content %}
<section id="content" class="content m-scene">
  <div class="container scene_element scene_element--fadeindown">
    <div class="row">
    	<div class="col-sm-10 col-sm-offset-1">
    		<h1>Origami</h1>
    		<img class="img-responsive" data-src="holder.js/1920x1200?auto=yes">
    	</div>
    </div>
    <div class="row">
    	<div class="col-sm-10 col-sm-offset-1">
    		<h1>Hello World</h1>
    		<img class="img-responsive" data-src="holder.js/1920x1200?auto=yes">
    	</div>
    </div>
    <div class="row">
    	<div class="col-sm-10 col-sm-offset-1">
    		<h1>Hello World</h1>
    		<img class="img-responsive" data-src="holder.js/1920x1200?auto=yes">
    	</div>
    </div>
    <div class="row">
    	<div class="col-sm-10 col-sm-offset-1">
    		<h1>Hello World</h1>
    		<img class="img-responsive" data-src="holder.js/1920x1200?auto=yes">
    	</div>
    </div>
  </div>
</section>
{% endblock %}
