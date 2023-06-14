from django.contrib import admin

from BadjosSmokeBBQ.common.models import Message


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('message', 'sender',)
    list_filter = ('sender',)
