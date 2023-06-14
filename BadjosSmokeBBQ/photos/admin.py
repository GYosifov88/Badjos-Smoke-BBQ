from django.contrib import admin

from BadjosSmokeBBQ.photos.models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category')
    list_filter = ('id', 'title', 'category')

