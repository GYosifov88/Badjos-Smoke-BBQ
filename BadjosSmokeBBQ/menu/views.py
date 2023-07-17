from django.shortcuts import render

from BadjosSmokeBBQ.articles.models import Article
from BadjosSmokeBBQ.menu.models import Menu


def show_menu(request):
    articles = Article.objects.all()
    starters = Menu.objects.filter(category='starter').all()
    bbq_dishes = Menu.objects.filter(category='bbq_dish').all()
    sides = Menu.objects.filter(category='side').all()
    desserts = Menu.objects.filter(category='dessert').all()
    beverages = Menu.objects.filter(category='beverage').all()
    context = {
        'articles': articles,
        'starters': starters,
        'bbq_dishes': bbq_dishes,
        'sides': sides,
        'desserts': desserts,
        'beverages': beverages,
    }
    return render(request, 'menu/menucard.html', context)
