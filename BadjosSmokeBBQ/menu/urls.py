from django.urls import path

from BadjosSmokeBBQ.menu.views import show_menu

urlpatterns = (
    path('', show_menu, name='menu'),
)