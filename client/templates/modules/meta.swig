{# [dash:data]
  {
    "status": "development",
    "category": "module",
    "label": "Meta",
    "link": "generated/meta.html"
  }
  [/dash] #}
{# [dash:swig]
  {% import 'client/templates/modules/meta.swig' as meta %}

  {{ meta.content() }}
  [/dash] #}

{% macro meta(pagetitle, description) %}
<title>{{pagetitle}}</title>
<meta name="{{description}}" content=""/>
{% endmacro %}
