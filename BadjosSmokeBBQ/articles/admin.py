from django.contrib import admin

from BadjosSmokeBBQ.articles.models import Article, ArticleComment


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'publication_date', 'category')
    list_filter = ('title', 'publication_date', 'category')


@admin.register(ArticleComment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('text', 'article')
    list_filter = ('text', 'article')