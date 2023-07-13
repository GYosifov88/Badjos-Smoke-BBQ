from BadjosSmokeBBQ.articles.models import Article


def get_article_url(request, article_id):
    return request.META['HTTP_REFERER'] + f'#article-{article_id}'


def get_articles_by_category(category):
    return Article.objects.filter(category=category).all().order_by('-publication_date')


def get_article_by_category_and_pk(category, pk):
    return Article.objects.filter(category=category).filter(pk=pk).get()
