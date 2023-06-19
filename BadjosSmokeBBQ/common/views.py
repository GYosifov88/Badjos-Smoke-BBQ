from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from django.shortcuts import render, redirect

from BadjosSmokeBBQ.articles.models import Article
from BadjosSmokeBBQ.common.forms import ContactForm
from BadjosSmokeBBQ.menu.models import Menu
from BadjosSmokeBBQ.photos.models import Photo


def index(request):
    user = request.user.pk
    foods = Menu.objects.all()
    photos = Photo.objects.all()
    articles = Article.objects.all()
    page = request.GET.get('page', 1)
    paginated_photos = Paginator(photos, 3)

    try:
        photos = paginated_photos.page(page)
    except PageNotAnInteger:
        photos = paginated_photos.page(1)
    except EmptyPage:
        photos = paginated_photos.page(paginated_photos.num_pages)

    context = {
        'user': user,
        'foods': foods,
        'articles': articles,
        'photos': photos,
    }
    return render(request, 'common/index.html', context, )


def show_contact_details(request):
    if request.method == 'GET':
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.user = request.user
            message.save()
            return redirect('index')
    context = {
        'form': form
    }

    return render(request, 'common/contact.html', context)