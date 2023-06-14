from django.contrib import admin

from BadjosSmokeBBQ.events.models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('pk', 'venue', 'venue_date', 'location')
    list_filter = ('pk', 'venue', 'venue_date', 'location')
