from django.urls import path

from BadjosSmokeBBQ.events.views import EventsListView

urlpatterns = (
    path('', EventsListView.as_view(), name='events'),
)