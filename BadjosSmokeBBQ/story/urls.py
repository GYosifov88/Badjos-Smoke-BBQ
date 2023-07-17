from django.urls import path

from BadjosSmokeBBQ.story.views import our_story

urlpatterns = (
    path('', our_story, name='story'),
)