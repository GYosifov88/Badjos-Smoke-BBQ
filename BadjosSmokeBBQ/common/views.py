from django.contrib import messages
from django.shortcuts import render, redirect
from django.urls import reverse

from BadjosSmokeBBQ.articles.models import Article
from BadjosSmokeBBQ.common.forms import ContactForm, NewsletterForm
from BadjosSmokeBBQ.menu.models import Menu
from BadjosSmokeBBQ.photos.models import Photo


def index(request):
    user = request.user.pk
    foods = Menu.objects.all()
    photos = Photo.objects.all()
    articles = Article.objects.all()

    context = {
        'user': user,
        'foods': foods,
        'articles': articles,
        'photos': photos,
    }
    return render(request, 'common/index.html', context)


def show_contact_details(request):
    contact_form = ContactForm()
    newsletter_form = NewsletterForm()
    articles = Article.objects.all()
    if request.method == 'GET':
        contact_form = ContactForm()
        newsletter_form = NewsletterForm()
    else:
        if 'contact_forms' in request.POST:
            contact_form = ContactForm(request.POST)
            if contact_form.is_valid():
                message = contact_form.save(commit=False)
                message.user = request.user
                message.save()
                messages.success(request, "Message has been sent successfully!")
                # return redirect(reverse('index'))
            else:
                messages.error(request, "An error occurred, please try again later.")

        elif 'newsletter_forms' in request.POST:
            newsletter_form = NewsletterForm(request.POST)
            if newsletter_form.is_valid():
                message = newsletter_form.save(commit=False)
                message.user = request.user
                message.save()
                messages.success(request, "Your e-mail has been added to our list!")
                # return redirect(reverse('index'))
            else:
                messages.error(request, "Error, please try again later.")
    context = {
        'newsletter_form': newsletter_form,
        'contact_form': contact_form,
        'articles': articles,
    }

    return render(request, 'common/contact.html', context)
