from django.contrib import admin

from BadjosSmokeBBQ.articles.models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'publication_date', 'category')
    list_filter = ('title', 'publication_date', 'category')

