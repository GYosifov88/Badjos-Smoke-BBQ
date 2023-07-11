from django.urls import path

from BadjosSmokeBBQ.articles.views import ArticlesListView, details_article, comment_article, \
    articles_category_list

urlpatterns = (
    path('', ArticlesListView.as_view(), name='articles'),
    path('<category>/', articles_category_list, name='categories'),
    path('<int:pk>/', details_article, name='article details'),
    path('comment/<int:article_pk>/', comment_article, name='comment article'),
)