from django.contrib import admin

from BadjosSmokeBBQ.photos.models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'category')
    list_filter = ('pk', 'title', 'category')

