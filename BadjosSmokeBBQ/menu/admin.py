from django.contrib import admin

from BadjosSmokeBBQ.menu.models import Menu


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'category', 'description')
    list_filter = ('pk', 'title', 'category')
