from django.urls import path

from BadjosSmokeBBQ.articles.views import articles_list, details_article, get_articles_category_list

urlpatterns = (
    path('', articles_list, name='articles'),
    path('<category>/', get_articles_category_list, name='categories'),
    path('<category>/<int:pk>/', details_article, name='article details'),
)