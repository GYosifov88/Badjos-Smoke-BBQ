from django.shortcuts import render

from BadjosSmokeBBQ.articles.models import Article


def our_story(request):
    articles = Article.objects.all()

    context = {
        'articles': articles,
    }
    return render(request, 'story/story.html', context)

