from django.shortcuts import render
from django.views.generic import ListView
from . import models
from .models import Event
from ..articles.models import Article


class EventsListView(ListView):
    context_object_name = 'events'
    model = models.Event
    template_name = 'events/events.html'

    def get_context_data(self, *args, **kwargs, ):
        context = super().get_context_data(*args, **kwargs)
        context['events'] = Event.objects.all()
        context['articles'] = Article.objects.all()
        return context
