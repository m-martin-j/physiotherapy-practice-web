---
title: "Massagen"
date: 2019-01-28T15:15:26+10:00
weight: 2
---

Manuelle Behandlung durch präzise Grifftechniken zur Lösung von Verspannungen, Förderung der Durchblutung und Linderung von Schmerzen.

In unserer Praxis erwartet Sie eine vielfältige Auswahl an Massagetherapien, die sowohl therapeutische Wirkungen entfalten als auch tiefe Entspannung schenken.
Ob zur gezielten Linderung akuter Beschwerden oder einfach als wohltuende Auszeit vom Alltag – wir bieten die passende Behandlung für Ihr persönliches Wohlbefinden.

## Medizinische Massagen
Unsere medizinischen Massagen sind gezielt darauf ausgerichtet, muskuläre Verspannungen zu lösen, die Durchblutung zu fördern und Schmerzen zu lindern.
Durch präzise Therapie- und Grifftechniken wird die Muskulatur sanft gelockert, der Stoffwechsel angeregt und die regenerative Heilung des Gewebes unterstützt.

{% assign accordion_id = "accordion-massagen-1" %}
<div id="{{ accordion_id }}" class="accordion">
  {% assign services_details_elements = site.data.services-details.massagen.medi %}
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


![Die rechte Hand einer Person gießt gelbliches Öl auf die Fläche der geöffeneten linken Hand. Im Hintergrund ist eine Person mit entblößtem Rücken unscharf zu erkennen.]({{ "/images/services/Massagen_md.jpeg" | relative_url }})

## Wellnessmassagen
Unsere Wellnessmassagen sind darauf ausgerichtet, Körper und Geist in Einklang zu bringen und Ihnen eine wohltuende Auszeit vom Alltag zu schenken. Mit sanften, fließenden Bewegungen und entspannenden Grifftechniken helfen Sie, Stress abzubauen, Verspannungen zu lösen und die innere Balance wiederherzustellen.

{% assign accordion_id = "accordion-massagen-2" %}
<div id="{{ accordion_id }}" class="accordion">
  {% assign services_details_elements = site.data.services-details.massagen.wellness %}
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


## Spezielle Massagetechniken
Darüber hinaus bieten wir weitere spezifische Massagen an, die auf die Behandlung diverser Beschwerden des Bindegewebes sowie der Muskeln ausgerichtet sind.

{% assign accordion_id = "accordion-massagen-3" %}
<div id="{{ accordion_id }}" class="accordion">
  {% assign services_details_elements = site.data.services-details.massagen.spezielle %}
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
