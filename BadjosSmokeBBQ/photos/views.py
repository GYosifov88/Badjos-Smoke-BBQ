from django.shortcuts import render
from django.views.generic import ListView

from BadjosSmokeBBQ.articles.models import Article
from BadjosSmokeBBQ.photos.models import Photo


# When implementing the showing of the photos, look at workshop 2 1hour:49min to see how to adjust the HTML
class PhotoListView(ListView):
    model = Photo
    template_name = 'photos/gallery.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['photos'] = Photo.objects.all()
        context['street_life_numbers'] = Photo.objects.filter(category='street_life').count()
        context['kitchen_life_numbers'] = Photo.objects.filter(category='kitchen_life').count()
        context['events_numbers'] = Photo.objects.filter(category='events').count()
        context['foods_numbers'] = Photo.objects.filter(category='foods').count()
        context['street_life_pictures'] = Photo.objects.filter(category='street_life').all()
        context['kitchen_life_pictures'] = Photo.objects.filter(category='kitchen_life').all()
        context['events_pictures'] = Photo.objects.filter(category='events').all()
        context['foods_pictures'] = Photo.objects.filter(category='foods').all()
        context['street_life_first'] = Photo.objects.filter(category='street_life').first()
        context['kitchen_life_first'] = Photo.objects.filter(category='kitchen_life').first()
        context['events_first'] = Photo.objects.filter(category='events').first()
        context['foods_first'] = Photo.objects.filter(category='foods').first()
        context['articles'] = Article.objects.all()
        return context