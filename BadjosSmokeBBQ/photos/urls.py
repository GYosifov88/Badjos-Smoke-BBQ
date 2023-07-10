from django.urls import path

from BadjosSmokeBBQ.photos.views import PhotoListView

urlpatterns = (
    path('', PhotoListView.as_view(), name='show photos'),
)