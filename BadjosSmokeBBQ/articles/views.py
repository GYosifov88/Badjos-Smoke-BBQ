from django.core.paginator import Paginator
from django.shortcuts import render

from BadjosSmokeBBQ.articles.models import Article

from .utils import get_articles_by_category, get_article_by_category_and_pk


def articles_list(request):
    articles = Article.objects.all()
    articles_all = Article.objects.all().order_by('-publication_date')
    articles_all = Paginator(articles_all, 1)
    page_number = request.GET.get("page", 1)
    articles_all = articles_all.get_page(page_number)

    context = {
        'articles': articles,
        'articles_all': articles_all,
    }

    return render(request, 'articles/articles.html', context)


def get_articles_category_list(request, category):
    articles_category_list = get_articles_by_category(category)
    articles = Article.objects.all()
    articles_category_list = articles_category_list.all()

    articles_category_list = Paginator(articles_category_list, 1)
    page_number = request.GET.get("page", 1)
    articles_category_list = articles_category_list.get_page(page_number)

    context = {
        'articles_category_list': articles_category_list,
        'articles': articles,
    }

    return render(request, 'articles/articles_categories.html', context)


def details_article(request, category, pk):
    article = get_article_by_category_and_pk(category, pk)
    articles = Article.objects.all()
    context = {
        'article': article,
        'articles': articles,
    }

    return render(request, 'articles/article_expand.html', context)




