---
title: "Wärmetherapie"
date: 2019-03-28T15:14:54+10:00
weight: 6
---

Gezielte Wärmetherapie um Muskelverspannungen zu lösen, die Durchblutung zu fördern und Schmerzen zu lindern.

Bei der Wärmetherapie wird wohltuende Wärme gezielt an bestimmten Körperstellen oder großflächig in einer gesamten Region angewendet. Neben der Durchblutung wird der Stoffwechsel sanft angeregt, und der natürliche Heilungsprozess des Körpers auf effektive Weise unterstützt.

![Das Knie einer Person wird von beiden Händen einer weiteren Person berührt. Rotes Licht einer Wärmelampe ist zu sehen. Die Frau hat ein Herz-Tattoo.]({{ "/images/services/Waermetherapie_md.jpg" | relative_url }})

## Wärmeanwendungen

Die Wärmetherapie dient oft als Vorbereitung auf weitere physiotherapeutische Maßnahmen, indem sie die Muskulatur erwärmt und elastischer macht, wodurch anschließende Übungen, Lockerungen und Mobilisationen effektiver durchgeführt werden können.

{% assign accordion_id = "accordion-waermetherapie-1" %}
<div id="{{ accordion_id }}" class="accordion">
  {% assign services_details_elements = site.data.services-details.waermetherapie.waermeanwendungen %}
  {% for element in services_details_elements %}
    {% assign collapse_indexer = forloop.index %}
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-{{ accordion_id }}-{{ collapse_indexer }}">
          {{ element.title }}
        </button>
      </h2>
      <div id="collapse-{{ accordion_id }}-{{ collapse_indexer }}" class="accordion-collapse collapse" data-bs-parent="#{{ accordion_id }}">
        <div class="accordion-body">
          {% if element.content %}
            <p>{{ element.content }}</p>
          {% endif %}
          {% if element.bullets %}
            <ul>
              {% for bullet in element.bullets %}
                <li>{{ bullet }}</li>
              {% endfor %}
            </ul>
          {% endif %}
          {% if element.link %}
            <a
              {% if element.link.external %}href="{{element.link.url}}"
              {% else %}href="{% link {{element.link.url}} %}"
              {% endif %}
              {% if element.link.external or element.link.file %}target="_blank" rel="noopener noreferrer"
              {% endif %}
              >
              {{ element.link.text }}
            </a>
          {% endif %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>
