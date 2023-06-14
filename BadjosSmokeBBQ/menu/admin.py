from django.contrib import admin

from BadjosSmokeBBQ.menu.models import Menu


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'description')
    list_filter = ('id', 'title', 'category')
