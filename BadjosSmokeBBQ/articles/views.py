from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.views.generic import ListView

from BadjosSmokeBBQ.articles.models import Article

from . import models
from .forms import ArticleCommentForm
from .utils import get_article_url, get_articles_by_category


class ArticlesListView(ListView):
    context_object_name = 'articles'
    model = models.Article
    template_name = 'articles/articles.html'
    articles_paginate_by = 1

    def get_article_page(self):
        return self.request.GET.get('page', 1)

    def get_paginated_articles(self):
        page = self.get_article_page()
        articles = self.object_list.all().order_by('-publication_date')
        paginator = Paginator(articles, self.articles_paginate_by)
        return paginator.get_page(page)

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['articles'] = self.get_paginated_articles()
        return context


def details_article(request, pk):
    article = Article.objects.filter(pk=pk).get()

    context = {
        'article': article,
        'comments': article.articlecomment_set.all(),
        'comments_count': article.articlecomment_set.count(),
    }

    return render(request, 'articles/article_expand.html', context)


def articles_category_list(request, category):
    articles = get_articles_by_category(category)
    paginator = Paginator(articles, 1)

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {
        'articles': articles,
        "page_obj": page_obj
    }

    return render(request, 'articles/articles_categories.html', context)


def comment_article(request, article_pk):
    if request.method == 'POST':
        article = Article.objects.filter(pk=article_pk).get()
        form = ArticleCommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.article = article
            comment.save()

    return redirect(get_article_url(request, article_pk))
