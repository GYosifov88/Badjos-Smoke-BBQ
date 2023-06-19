from django.urls import path

from BadjosSmokeBBQ.common.views import index, show_contact_details

urlpatterns = (
    path('', index, name='index'),
    path('contacts/', show_contact_details, name='contacts'),
)