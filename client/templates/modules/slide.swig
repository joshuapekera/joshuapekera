{# [dash:data]
  {
    "status": "development",
    "category": "module",
    "label": "Slide",
    "link": "generated/slide.html"
  }
  [/dash] #}
{# [dash:swig]
  {% import 'client/templates/modules/slide.swig' as slide %}

  {{ slide.content() }}
  [/dash] #}

{% macro slide(id, img, alt, link) %}
<li id="{{ id }}">
  <img data-sizes="auto" data-srcset="../images/{{ img }}-sm.jpg 600w, ../images/{{ img }}-md.jpg 1000w, ../images/{{ img }}-lg.jpg 2000w" class="lazyload" alt="{{ alt }}" />
  <div class="caption">
    <a href="{{ link }}" class="btn ion-ios-albums-outline"></a>
  </div>
</li>
{% endmacro %}
