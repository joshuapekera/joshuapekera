
{# Provides layout level markup #}
{% block layout %}
<header id="header">
  <nav id="appnav">
    <div class="menu">
      {% block content %}
      <a href="index.html">Products</a>
      <a href="swoosh.html">About</a>
      <a href="#">Contact</a>
      {% endblock %}
    </div>
  </nav>
</header>
{% endblock %}
